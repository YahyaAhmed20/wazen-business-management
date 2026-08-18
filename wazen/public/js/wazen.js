frappe.pages["wazen_home"].on_page_load = function (wrapper) {
    const page = frappe.ui.make_app_page({
        parent: wrapper,
        title: "Wazen",
        single_column: true,
    });

    const container = $(wrapper).find(".layout-main-section");

    container.html(`
        <div class="wazen-dashboard">

            <div class="wazen-dashboard-header">
                <div>
                    <h1>Wazen</h1>
                    <p>Business Management System</p>
                </div>

                <div>
                    <button class="wazen-action-btn">
                        + New Transaction
                    </button>
                </div>
            </div>

            <div class="wazen-kpi-grid">

                <div class="wazen-kpi-card">
                    <div class="wazen-kpi-label">Sales</div>
                    <div class="wazen-kpi-value" id="wazen-sales">
                        0.00
                    </div>
                    <div class="wazen-kpi-meta">Today</div>
                </div>

                <div class="wazen-kpi-card">
                    <div class="wazen-kpi-label">Purchases</div>
                    <div class="wazen-kpi-value" id="wazen-purchases">
                        0.00
                    </div>
                    <div class="wazen-kpi-meta">Today</div>
                </div>

                <div class="wazen-kpi-card">
                    <div class="wazen-kpi-label">Receivables</div>
                    <div class="wazen-kpi-value" id="wazen-receivables">
                        0.00
                    </div>
                    <div class="wazen-kpi-meta">Outstanding</div>
                </div>

                <div class="wazen-kpi-card">
                    <div class="wazen-kpi-label">Payables</div>
                    <div class="wazen-kpi-value" id="wazen-payables">
                        0.00
                    </div>
                    <div class="wazen-kpi-meta">Outstanding</div>
                </div>

            </div>

            <div class="wazen-dashboard-grid">

                <div class="wazen-panel wazen-panel-large">

                    <div class="wazen-panel-header">
                        <h3>Sales Overview</h3>
                        <span>Last 30 Days</span>
                    </div>

                    <div class="wazen-chart-placeholder" id="wazen-sales-chart">
                        Loading...
                    </div>

                </div>

                <div class="wazen-panel">

                    <div class="wazen-panel-header">
                        <h3>Quick Actions</h3>
                    </div>

                    <div class="wazen-quick-actions">

                        <a href="/app/sales-invoice">
                            Sales Invoice
                        </a>

                        <a href="/app/purchase-invoice">
                            Purchase Invoice
                        </a>

                        <a href="/app/customer">
                            Customer
                        </a>

                        <a href="/app/supplier">
                            Supplier
                        </a>

                        <a href="/app/item">
                            Item
                        </a>

                        <a href="/app/stock">
                            Stock
                        </a>

                    </div>

                </div>

            </div>

        </div>
    `);

    load_dashboard_data();
};


function load_dashboard_data() {
    frappe.call({
        method: "wazen.wazen.api.dashboard.get_dashboard_data",

        callback: function (response) {
            if (!response.message) {
                return;
            }

            const data = response.message;

            $("#wazen-sales").text(format_currency(data.sales));
            $("#wazen-purchases").text(format_currency(data.purchases));
            $("#wazen-receivables").text(format_currency(data.receivables));
            $("#wazen-payables").text(format_currency(data.payables));

            render_sales_chart(data.sales_chart);
        },
    });
}


function format_currency(value) {
    return Number(value || 0).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}


function render_sales_chart(data) {
    const chart = $("#wazen-sales-chart");

    if (!data || !data.length) {
        chart.html(`
            <div class="wazen-empty-chart">
                No sales data available
            </div>
        `);

        return;
    }

    const max_value = Math.max(...data.map(row => row.total), 1);

    chart.html(`
        <div class="wazen-simple-chart">
            ${data.map(row => `
                <div
                    class="wazen-chart-bar"
                    style="height: ${(row.total / max_value) * 100}%"
                    title="${row.date}: ${format_currency(row.total)}"
                ></div>
            `).join("")}
        </div>
    `);
}