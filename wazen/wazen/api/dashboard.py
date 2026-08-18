import frappe
from frappe.utils import today
from datetime import timedelta


@frappe.whitelist()
def get_dashboard_data():
    current_date = today()

    return {
        "sales": get_today_sales(current_date),
        "purchases": get_today_purchases(current_date),
        "receivables": get_receivables(),
        "payables": get_payables(),
        "sales_chart": get_sales_chart(),
        "recent_transactions": get_recent_transactions(),
        "low_stock": get_low_stock(),  # ✅ إضافة المنتجات منخفضة المخزون
    }


def get_today_sales(date):
    result = frappe.db.sql(
        """
        SELECT COALESCE(SUM(grand_total), 0)
        FROM `tabSales Invoice`
        WHERE posting_date = %s
        AND docstatus = 1
        """,
        date,
    )

    return float(result[0][0] or 0)


def get_today_purchases(date):
    result = frappe.db.sql(
        """
        SELECT COALESCE(SUM(grand_total), 0)
        FROM `tabPurchase Invoice`
        WHERE posting_date = %s
        AND docstatus = 1
        """,
        date,
    )

    return float(result[0][0] or 0)


def get_receivables():
    result = frappe.db.sql(
        """
        SELECT COALESCE(SUM(outstanding_amount), 0)
        FROM `tabSales Invoice`
        WHERE docstatus = 1
        AND outstanding_amount > 0
        """
    )

    return float(result[0][0] or 0)


def get_payables():
    result = frappe.db.sql(
        """
        SELECT COALESCE(SUM(outstanding_amount), 0)
        FROM `tabPurchase Invoice`
        WHERE docstatus = 1
        AND outstanding_amount > 0
        """
    )

    return float(result[0][0] or 0)


def get_sales_chart():
    result = frappe.db.sql(
        """
        SELECT
            posting_date,
            SUM(grand_total) AS total
        FROM `tabSales Invoice`
        WHERE posting_date >= DATE_SUB(CURDATE(), INTERVAL 29 DAY)
        AND posting_date <= CURDATE()
        AND docstatus = 1
        GROUP BY posting_date
        ORDER BY posting_date
        """,
        as_dict=True,
    )

    sales_by_date = {
        str(row.posting_date): float(row.total or 0)
        for row in result
    }

    today_date = frappe.utils.getdate(frappe.utils.today())

    chart_data = []

    for i in range(29, -1, -1):
        date = today_date - timedelta(days=i)
        date_string = str(date)

        chart_data.append(
            {
                "date": date_string,
                "total": sales_by_date.get(date_string, 0),
            }
        )

    return chart_data


# =========================================
# ✅ RECENT TRANSACTIONS
# =========================================

def get_recent_transactions(limit=8):
    """
    جلب أحدث المعاملات (فواتير المبيعات والمشتريات)
    """
    transactions = []

    # جلب أحدث فواتير المبيعات
    sales_invoices = frappe.db.sql(
        """
        SELECT
            name,
            customer,
            grand_total,
            currency,
            posting_date,
            docstatus
        FROM `tabSales Invoice`
        ORDER BY modified DESC
        LIMIT %s
        """,
        limit,
        as_dict=True,
    )

    for row in sales_invoices:
        transactions.append(
            {
                "doctype": "Sales Invoice",
                "name": row.name,
                "party": row.customer,
                "amount": float(row.grand_total or 0),
                "currency": row.currency,
                "date": str(row.posting_date),
                "status": get_document_status(row.docstatus),
                "route": f"/app/sales-invoice/{row.name}",
            }
        )

    # جلب أحدث فواتير المشتريات
    purchase_invoices = frappe.db.sql(
        """
        SELECT
            name,
            supplier,
            grand_total,
            currency,
            posting_date,
            docstatus
        FROM `tabPurchase Invoice`
        ORDER BY modified DESC
        LIMIT %s
        """,
        limit,
        as_dict=True,
    )

    for row in purchase_invoices:
        transactions.append(
            {
                "doctype": "Purchase Invoice",
                "name": row.name,
                "party": row.supplier,
                "amount": float(row.grand_total or 0),
                "currency": row.currency,
                "date": str(row.posting_date),
                "status": get_document_status(row.docstatus),
                "route": f"/app/purchase-invoice/{row.name}",
            }
        )

    # ترتيب المعاملات من الأحدث إلى الأقدم
    transactions.sort(
        key=lambda x: x["date"],
        reverse=True,
    )

    # إرجاع أول 8 معاملات فقط
    return transactions[:limit]


def get_document_status(docstatus):
    """
    تحويل رقم الحالة إلى نص مفهوم
    """
    if docstatus == 0:
        return "Draft"
    if docstatus == 1:
        return "Submitted"
    if docstatus == 2:
        return "Cancelled"
    return "Unknown"


# =========================================
# ✅ LOW STOCK ITEMS
# =========================================

def get_low_stock(limit=8):
    """
    جلب المنتجات التي وصلت إلى مستوى إعادة الطلب
    """
    result = frappe.db.sql(
        """
        SELECT
            b.item_code,
            i.item_name,
            b.warehouse,
            b.actual_qty,
            b.projected_qty,
            b.stock_uom,
            ir.warehouse_reorder_level,
            ir.warehouse_reorder_qty
        FROM `tabBin` b
        INNER JOIN `tabItem` i
            ON i.name = b.item_code
        INNER JOIN `tabItem Reorder` ir
            ON ir.parent = b.item_code
            AND ir.warehouse = b.warehouse
        WHERE
            i.disabled = 0
            AND i.is_stock_item = 1
            AND b.actual_qty <= ir.warehouse_reorder_level
        ORDER BY
            b.actual_qty ASC
        LIMIT %s
        """,
        limit,
        as_dict=True,
    )

    return [
        {
            "item_code": row.item_code,
            "item_name": row.item_name,
            "warehouse": row.warehouse,
            "actual_qty": float(row.actual_qty or 0),
            "projected_qty": float(row.projected_qty or 0),
            "stock_uom": row.stock_uom,
            "reorder_level": float(row.warehouse_reorder_level or 0),
            "reorder_qty": float(row.warehouse_reorder_qty or 0),
        }
        for row in result
    ]