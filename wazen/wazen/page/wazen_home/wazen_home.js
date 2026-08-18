// ========================================
// WAZEN DASHBOARD - Main Page
// ========================================

frappe.pages["wazen_home"].on_page_load = function (wrapper) {
    // ✅ تحميل الـ CSS المخصص
    load_wazen_styles();

    const page = frappe.ui.make_app_page({
        parent: wrapper,
        title: "Wazen",
        single_column: true,
        full_width: true, // ✅ عرض كامل
    });

    const container = $(wrapper).find(".layout-main-section");
    
    // ✅ توسيط المحتوى
    container.css({
        'max-width': '1400px',
        'margin': '0 auto',
        'padding': '0 20px'
    });

    container.html(`
        <div class="wazen-dashboard">

            <!-- Header -->
            <div class="wazen-dashboard-header">
                <div>
                    <h1>⚡ Wazen</h1>
                    <p>Business Management System</p>
                </div>
                <div class="wazen-header-actions">
                    <button type="button" class="wazen-action-btn" id="wazen-new-transaction-btn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        New Transaction
                    </button>
                </div>
            </div>

            <!-- KPI Cards -->
            <div class="wazen-kpi-grid">

                <div class="wazen-kpi-card">
                    <div class="wazen-kpi-label">💰 Sales</div>
                    <div class="wazen-kpi-value" id="wazen-sales">
                        0.00
                    </div>
                    <div class="wazen-kpi-meta">Today</div>
                </div>

                <div class="wazen-kpi-card">
                    <div class="wazen-kpi-label">🛒 Purchases</div>
                    <div class="wazen-kpi-value" id="wazen-purchases">
                        0.00
                    </div>
                    <div class="wazen-kpi-meta">Today</div>
                </div>

                <div class="wazen-kpi-card">
                    <div class="wazen-kpi-label">📈 Receivables</div>
                    <div class="wazen-kpi-value" id="wazen-receivables">
                        0.00
                    </div>
                    <div class="wazen-kpi-meta">Outstanding</div>
                </div>

                <div class="wazen-kpi-card">
                    <div class="wazen-kpi-label">📉 Payables</div>
                    <div class="wazen-kpi-value" id="wazen-payables">
                        0.00
                    </div>
                    <div class="wazen-kpi-meta">Outstanding</div>
                </div>

            </div>

            <!-- Main Grid -->
            <div class="wazen-dashboard-grid">

                <!-- Chart Panel -->
                <div class="wazen-panel wazen-panel-large">

                    <div class="wazen-panel-header">
                        <h3>📊 Sales Overview <span class="badge">30 Days</span></h3>
                        <span>Last 30 Days</span>
                    </div>

                    <div class="wazen-chart-placeholder" id="wazen-sales-chart">
                        <div class="wazen-loading">
                            <div class="wazen-spinner"></div>
                            <span>Loading chart...</span>
                        </div>
                    </div>

                </div>

                <!-- Quick Actions Panel -->
                <div class="wazen-panel">

                    <div class="wazen-panel-header">
                        <h3>⚡ Quick Actions</h3>
                    </div>

                    <div class="wazen-quick-actions">

                        <a href="/app/sales-invoice">
                            <span class="icon">📄</span> Sales Invoice
                        </a>

                        <a href="/app/purchase-invoice">
                            <span class="icon">📄</span> Purchase Invoice
                        </a>

                        <a href="/app/customer">
                            <span class="icon">👤</span> Customer
                        </a>

                        <a href="/app/supplier">
                            <span class="icon">🏢</span> Supplier
                        </a>

                        <a href="/app/item">
                            <span class="icon">📦</span> Item
                        </a>

                        <a href="/app/stock">
                            <span class="icon">🏪</span> Stock
                        </a>

                    </div>

                </div>

            </div>

            <!-- ✅ Recent Transactions -->
            <div class="wazen-panel wazen-recent-transactions-panel">

                <div class="wazen-panel-header">
                    <div>
                        <h3>🧾 Recent Transactions</h3>
                        <span>Latest business transactions</span>
                    </div>

                    <a href="/app/sales-invoice" class="wazen-view-all">
                        View All →
                    </a>
                </div>

                <div id="wazen-recent-transactions" class="wazen-recent-transactions">
                    <div class="wazen-loading">
                        <div class="wazen-spinner"></div>
                        <span>Loading transactions...</span>
                    </div>
                </div>

            </div>

            <!-- ✅ Low Stock -->
            <div class="wazen-panel wazen-low-stock-panel">

                <div class="wazen-panel-header">
                    <div>
                        <h3>⚠️ Low Stock</h3>
                        <span>Items that need attention</span>
                    </div>

                    <a href="/app/item" class="wazen-view-all">
                        View Items →
                    </a>
                </div>

                <div id="wazen-low-stock" class="wazen-low-stock">
                    <div class="wazen-loading">
                        <div class="wazen-spinner"></div>
                        <span>Loading stock...</span>
                    </div>
                </div>

            </div>

        </div>
    `);

    // ✅ ربط الزر بواسطة JavaScript (بدلاً من onclick)
    $("#wazen-new-transaction-btn").on("click", function () {
        wazen_new_transaction();
    });

    // ✅ تحميل البيانات
    load_dashboard_data();
};

// ========================================
// LOAD WAZEN STYLES
// ========================================

function load_wazen_styles() {
    // تحقق إذا كان الـ CSS محمل بالفعل
    if (document.getElementById('wazen-dashboard-css')) {
        return;
    }

    const style = document.createElement('link');
    style.id = 'wazen-dashboard-css';
    style.rel = 'stylesheet';
    style.href = '/assets/wazen/css/wazen_dashboard.css';
    document.head.appendChild(style);
}

// ========================================
// NEW TRANSACTION - النسخة الجديدة (Dialog)
// ========================================

function wazen_new_transaction() {
    const dialog = new frappe.ui.Dialog({
        title: "New Transaction",
        fields: [
            {
                fieldtype: "HTML",
                fieldname: "transaction_options",
                options: `
                    <div class="wazen-transaction-options">

                        <button
                            type="button"
                            class="wazen-transaction-option"
                            data-route="sales-invoice/new"
                        >
                            <span class="wazen-transaction-icon">📄</span>

                            <span class="wazen-transaction-content">
                                <strong>Sales Invoice</strong>
                                <small>Create a new sales invoice</small>
                            </span>

                            <span class="wazen-transaction-arrow">→</span>
                        </button>

                        <button
                            type="button"
                            class="wazen-transaction-option"
                            data-route="purchase-invoice/new"
                        >
                            <span class="wazen-transaction-icon">🛒</span>

                            <span class="wazen-transaction-content">
                                <strong>Purchase Invoice</strong>
                                <small>Create a new purchase invoice</small>
                            </span>

                            <span class="wazen-transaction-arrow">→</span>
                        </button>

                        <button
                            type="button"
                            class="wazen-transaction-option"
                            data-route="payment-entry/new"
                        >
                            <span class="wazen-transaction-icon">💳</span>

                            <span class="wazen-transaction-content">
                                <strong>Payment Entry</strong>
                                <small>Record a payment</small>
                            </span>

                            <span class="wazen-transaction-arrow">→</span>
                        </button>

                        <button
                            type="button"
                            class="wazen-transaction-option"
                            data-route="journal-entry/new"
                        >
                            <span class="wazen-transaction-icon">📒</span>

                            <span class="wazen-transaction-content">
                                <strong>Journal Entry</strong>
                                <small>Create a journal entry</small>
                            </span>

                            <span class="wazen-transaction-arrow">→</span>
                        </button>

                    </div>
                `
            }
        ],
        primary_action_label: "Close",
        primary_action() {
            dialog.hide();
        }
    });

    dialog.show();

    dialog.$wrapper
        .find(".wazen-transaction-option")
        .on("click", function () {
            const route = $(this).data("route");

            dialog.hide();

            frappe.set_route(route);
        });
}

// ========================================
// LOAD DASHBOARD DATA
// ========================================

function load_dashboard_data() {
    // ✅ إظهار حالة التحميل على الـ KPI
    $(".wazen-kpi-value").text("...");

    frappe.call({
        method: "wazen.wazen.api.dashboard.get_dashboard_data",

        callback: function (response) {
            if (!response.message) {
                show_dashboard_error("No data received from server");
                return;
            }

            const data = response.message;

            // تحديث الـ KPI Cards
            update_kpi_cards(data);

            // تحديث الرسم البياني
            render_sales_chart(data.sales_chart);

            // ✅ تحديث المعاملات الأخيرة
            render_recent_transactions(data.recent_transactions);

            // ✅ تحديث المنتجات منخفضة المخزون
            render_low_stock(data.low_stock);
        },

        error: function (error) {
            console.error("Dashboard Error:", error);
            show_dashboard_error("Failed to load dashboard data");
        }
    });
}

// ========================================
// UPDATE KPI CARDS
// ========================================

function update_kpi_cards(data) {
    const kpis = [
        { id: "wazen-sales", value: data.sales },
        { id: "wazen-purchases", value: data.purchases },
        { id: "wazen-receivables", value: data.receivables },
        { id: "wazen-payables", value: data.payables }
    ];

    kpis.forEach(kpi => {
        const element = $(`#${kpi.id}`);
        if (element.length) {
            element.text(format_currency(kpi.value));
            // إضافة تأثير ظهور
            element.css('opacity', '0');
            setTimeout(() => {
                element.css('transition', 'opacity 0.5s ease');
                element.css('opacity', '1');
            }, 50);
        }
    });
}

// ========================================
// SHOW DASHBOARD ERROR
// ========================================

function show_dashboard_error(message) {
    const chart = $("#wazen-sales-chart");
    if (chart.length) {
        chart.html(`
            <div class="wazen-empty-chart">
                <div>
                    <div style="font-size: 32px; margin-bottom: 8px;">⚠️</div>
                    <div>${message}</div>
                    <button class="btn btn-sm btn-primary" style="margin-top: 12px;" onclick="load_dashboard_data()">
                        🔄 Retry
                    </button>
                </div>
            </div>
        `);
    }

    // إظهار رسالة خطأ للمستخدم
    frappe.show_alert({
        message: message,
        indicator: 'red'
    }, 5);
}

// ========================================
// FORMAT CURRENCY
// ========================================

function format_currency(value) {
    return Number(value || 0).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}

// ========================================
// RENDER SALES CHART
// ========================================

function render_sales_chart(data) {
    const chart = $("#wazen-sales-chart");

    if (!data || !data.length) {
        chart.html(`
            <div class="wazen-empty-chart">
                <div>
                    <div style="font-size: 32px; margin-bottom: 8px;">📊</div>
                    <div>No sales data available</div>
                    <div style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">
                        Start recording sales to see insights
                    </div>
                </div>
            </div>
        `);
        return;
    }

    const max_value = Math.max(
        ...data.map(row => Number(row.total || 0)),
        1
    );

    chart.html(`
        <div class="wazen-sales-chart">

            <div class="wazen-chart-bars">
                ${data.map((row, index) => {
                    const value = Number(row.total || 0);

                    const height = value > 0
                        ? Math.max((value / max_value) * 100, 4)
                        : 2;

                    const date = new Date(`${row.date}T00:00:00`);

                    const label = date.toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric"
                    });

                    // إظهار التسميات بشكل محدود (أول، آخر، كل 7 أيام)
                    const show_label =
                        index === 0 ||
                        index === data.length - 1 ||
                        index % 7 === 0;

                    // تحديد لون مميز لأعلى قيمة
                    const is_highest = value === max_value;

                    return `
                        <div class="wazen-chart-column ${is_highest ? 'wazen-highest' : ''}">

                            <div
                                class="wazen-chart-value"
                                title="${label}: ${format_currency(value)}"
                            >
                                ${value > 0 ? format_currency(value) : ""}
                            </div>

                            <div class="wazen-chart-bar-wrapper">

                                <div
                                    class="wazen-chart-bar"
                                    style="height: ${height}%"
                                    title="${label}: ${format_currency(value)}"
                                ></div>

                            </div>

                            <div class="wazen-chart-label">
                                ${show_label ? label : ""}
                            </div>

                        </div>
                    `;
                }).join("")}
            </div>

        </div>
    `);

    // ✅ تحديث الـ KPI بعد تحميل الرسم البياني
    update_kpi_after_chart(data);
}

// ========================================
// UPDATE KPI AFTER CHART (for additional insights)
// ========================================

function update_kpi_after_chart(data) {
    if (!data || !data.length) return;

    // حساب إجمالي المبيعات من الرسم البياني
    const total_sales = data.reduce((sum, row) => sum + Number(row.total || 0), 0);

    // إضافة ملخص صغير تحت الرسم البياني
    const chart_container = $("#wazen-sales-chart");
    if (chart_container.length) {
        const summary = `
            <div class="wazen-chart-summary">
                <span>Total: ${format_currency(total_sales)}</span>
                <span>•</span>
                <span>${data.length} days</span>
                <span>•</span>
                <span>Avg: ${format_currency(total_sales / data.length)}</span>
            </div>
        `;

        // إضافة الملخص بعد الرسم البياني
        chart_container.append(`
            <div class="wazen-chart-footer">
                ${summary}
            </div>
        `);
    }
}

// ========================================
// ✅ RENDER RECENT TRANSACTIONS
// ========================================

function render_recent_transactions(data) {
    const container = $("#wazen-recent-transactions");

    if (!data || !data.length) {
        container.html(`
            <div class="wazen-empty-state">
                No recent transactions
            </div>
        `);
        return;
    }

    container.html(
        data.map(transaction => {
            const status_class = transaction.status.toLowerCase();

            return `
                <a
                    href="${transaction.route}"
                    class="wazen-transaction-row"
                >
                    <div class="wazen-transaction-type-icon">
                        ${transaction.doctype === "Sales Invoice"
                            ? "🧾"
                            : "🛒"}
                    </div>

                    <div class="wazen-transaction-main">
                        <div class="wazen-transaction-title">
                            ${transaction.name}
                        </div>
                        <div class="wazen-transaction-meta">
                            ${transaction.doctype}
                            ·
                            ${transaction.party || "—"}
                            ·
                            ${transaction.date}
                        </div>
                    </div>

                    <div class="wazen-transaction-amount">
                        ${format_currency(transaction.amount)}
                        ${transaction.currency || ""}
                    </div>

                    <div class="wazen-transaction-status ${status_class}">
                        ${transaction.status}
                    </div>

                    <div class="wazen-transaction-arrow">
                        →
                    </div>
                </a>
            `;
        }).join("")
    );
}

// ========================================
// ✅ RENDER LOW STOCK ITEMS
// ========================================

function render_low_stock(data) {
    const container = $("#wazen-low-stock");

    if (!data || !data.length) {
        container.html(`
            <div class="wazen-empty-state">
                <div class="empty-icon">✅</div>
                <div class="empty-title">All stock levels are healthy</div>
                <div class="empty-sub">No items below reorder level</div>
            </div>
        `);
        return;
    }

    container.html(
        data.map(item => {
            // حساب النسبة المئوية للمخزون المتبقي
            const percentage = Math.min(
                (item.actual_qty / item.reorder_level) * 100,
                100
            );

            // تحديد لون الحالة
            let status_color = '#22c55e'; // أخضر
            let status_text = 'Good';

            if (percentage < 25) {
                status_color = '#ef4444'; // أحمر
                status_text = 'Critical';
            } else if (percentage <= 50) {
                status_color = '#f59e0b';
                status_text = 'Low';
            }

            return `
                <a
                    href="/app/item/${item.item_code}"
                    class="wazen-stock-row"
                >
                    <div class="wazen-stock-info">
                        <div class="wazen-stock-code">${item.item_code}</div>
                        <div class="wazen-stock-name">${item.item_name}</div>
                    </div>

                    <div class="wazen-stock-warehouse">
                        ${item.warehouse}
                    </div>

                    <div class="wazen-stock-qty">
                        <span class="wazen-stock-qty-value">
                            ${item.actual_qty}
                        </span>
                        <span class="wazen-stock-uom">
                            ${item.stock_uom}
                        </span>
                    </div>

                    <div class="wazen-stock-progress">
                        <div class="wazen-stock-progress-bar">
                            <div
                                class="wazen-stock-progress-fill"
                                style="width: ${Math.max(percentage, 5)}%; background: ${status_color};"
                            ></div>
                        </div>
                        <div class="wazen-stock-progress-label">
                            Reorder: ${item.reorder_level}
                        </div>
                    </div>

                    <div class="wazen-stock-status" style="color: ${status_color};">
                        ${status_text}
                    </div>
                </a>
            `;
        }).join("")
    );
}

// ========================================
// AUTO REFRESH (optional)
// ========================================

// تحديث البيانات كل 5 دقائق
setInterval(function() {
    if (document.querySelector('.wazen-dashboard')) {
        load_dashboard_data();
    }
}, 300000); // 5 minutes

// ========================================
// KEYBOARD SHORTCUTS
// ========================================

$(document).on('keydown', function(e) {
    // Ctrl + N = New Transaction
    if (e.ctrlKey && e.key === 'n') {
        e.preventDefault();
        if (document.querySelector('.wazen-dashboard')) {
            wazen_new_transaction();
        }
    }

    // Ctrl + R = Refresh Data
    if (e.ctrlKey && e.key === 'r') {
        if (document.querySelector('.wazen-dashboard')) {
            e.preventDefault();
            load_dashboard_data();
            frappe.show_alert({
                message: "🔄 Dashboard refreshed",
                indicator: 'blue'
            }, 2);
        }
    }
});