import os

import frappe
import frappe.app

frappe.app._sites_path = "/home/frappe/frappe-bench/sites"
os.environ["FRAPPE_SITE_NAME_HEADER"] = "Host"

application = frappe.app.application_with_statics()
