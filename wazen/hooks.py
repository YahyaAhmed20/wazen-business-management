# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from frappe import _

app_name = "wazen"
app_title = "Wazen"
app_publisher = "Wazen"
app_description = "Wazen Business Management and ERP System"
app_email = "yahmdh6@gmail.com"
app_license = "mit"

# Apps
# ------------------

# required_apps = []

# Each item in the list will be shown as an app in the apps page
# add_to_apps_screen = [
# 	{
# 		"name": "wazen",
# 		"logo": "/assets/wazen/logo.png",
# 		"title": "Wazen",
# 		"route": "/wazen",
# 		"has_permission": "wazen.api.permission.has_app_permission"
# 	}
# ]

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/wazen/css/wazen.css"
# app_include_js = "/assets/wazen/js/wazen.js"

# include js, css files in header of web template
# web_include_css = "/assets/wazen/css/wazen.css"
# web_include_js = "/assets/wazen/js/wazen.js"

# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "wazen/public/scss/website"

# include js, css files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Svg Icons
# ------------------
# include app icons in desk
# app_include_icons = "wazen/public/icons.svg"

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
# 	"Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# automatically load and sync documents of this doctype from downstream apps
# importable_doctypes = [doctype_1]

# Jinja
# ----------

# add methods and filters to jinja environment
# jinja = {
# 	"methods": "wazen.utils.jinja_methods",
# 	"filters": "wazen.utils.jinja_filters"
# }

# Installation
# ------------

# before_install = "wazen.install.before_install"
# after_install = "wazen.install.after_install"

# Uninstallation
# ------------

# before_uninstall = "wazen.uninstall.before_uninstall"
# after_uninstall = "wazen.uninstall.after_uninstall"

# Integration Setup
# ------------------
# To set up dependencies/integrations with other apps
# Name of the app being installed is passed as an argument

# before_app_install = "wazen.utils.before_app_install"
# after_app_install = "wazen.utils.after_app_install"

# Integration Cleanup
# -------------------
# To clean up dependencies/integrations with other apps
# Name of the app being uninstalled is passed as an argument

# before_app_uninstall = "wazen.utils.before_app_uninstall"
# after_app_uninstall = "wazen.utils.after_app_uninstall"

# Build
# ------------------
# To hook into the build process

# after_build = "wazen.build.after_build"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "wazen.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
# 	}
# }

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"wazen.tasks.all"
# 	],
# 	"daily": [
# 		"wazen.tasks.daily"
# 	],
# 	"hourly": [
# 		"wazen.tasks.hourly"
# 	],
# 	"weekly": [
# 		"wazen.tasks.weekly"
# 	],
# 	"monthly": [
# 		"wazen.tasks.monthly"
# 	],
# }

# Testing
# -------

# before_tests = "wazen.install.before_tests"

# Extend DocType Class
# ------------------------------
#
# Specify custom mixins to extend the standard doctype controller.
# extend_doctype_class = {
# 	"Task": "wazen.custom.task.CustomTaskMixin"
# }

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "wazen.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
# 	"Task": "wazen.task.get_dashboard_data"
# }

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]

# Ignore links to specified DocTypes when deleting documents
# -----------------------------------------------------------

# ignore_links_on_delete = ["Communication", "ToDo"]

# Request Events
# ----------------
# before_request = ["wazen.utils.before_request"]
# after_request = ["wazen.utils.after_request"]

# Job Events
# ----------
# before_job = ["wazen.utils.before_job"]
# after_job = ["wazen.utils.after_job"]

# User Data Protection
# --------------------

# user_data_fields = [
# 	{
# 		"doctype": "{doctype_1}",
# 		"filter_by": "{filter_by}",
# 		"redact_fields": ["{field_1}", "{field_2}"],
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_2}",
# 		"filter_by": "{filter_by}",
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_3}",
# 		"filter_by": "{filter_by}",
# 		"strict": False,
# 	},
# 	{
# 		"doctype": "{doctype_4}"
# 	}
# ]

# Authentication and authorization
# --------------------------------

# auth_hooks = [
# 	"wazen.auth.validate"
# ]

# Automatically update python controller files with type annotations for this app.
# export_python_type_annotations = True

# default_log_clearing_doctypes = {
# 	"Logging DocType Name": 30  # days to retain logs
# }

# Translation
# ------------
# List of apps whose translatable strings should be excluded from this app's translations.
# ignore_translatable_strings_from = []
# ============================================================
# WAZEN BRAND IDENTITY
# ============================================================

app_logo_url = "/assets/wazen/images/wazen-navbar.png"

app_home = "/app/wazen_home"

add_to_apps_screen = [
    {
        "name": "wazen",
        "logo": "/assets/wazen/images/wazen-icon-512.png",
        "title": "Wazen",
        "route": "/app/wazen_home",
    }
]

app_include_css = "/assets/wazen/css/wazen.css"
app_include_js = "/assets/wazen/js/wazen.js"

brand_html = """
<a href="/app/wazen_home" class="wazen-brand">
    <img src="/assets/wazen/images/wazen-navbar.png" alt="Wazen">
</a>
"""