import frappe.app

frappe.app._sites_path = "/home/frappe/frappe-bench/sites"

application = frappe.app.application_with_statics()