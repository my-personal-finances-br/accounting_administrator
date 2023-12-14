from .settings import *  # noqa
from .settings import env

# GENERAL
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#debug
DEBUG = True
# https://docs.djangoproject.com/en/dev/ref/settings/#secret-key
SECRET_KEY = env(
    "DJANGO_SECRET_KEY",
    default="YOSotCpdJ9Lkbukgq1igmVldbuQpbFOle1wOWPz7GxGO0C5FPGEPiA51kvXnvnr8",
)
# https://docs.djangoproject.com/en/dev/ref/settings/#allowed-hosts
ALLOWED_HOSTS = ["localhost", "0.0.0.0", "127.0.0.1", "bs-local.com", "django"]

# CACHES
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#caches
CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.locmem.LocMemCache",
        "LOCATION": "",
    }
}

# TEMPLATES
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#templates
TEMPLATES[0]["OPTIONS"]["debug"] = DEBUG  # noqa F405


# django-debug-toolbar
# ------------------------------------------------------------------------------
# https://django-debug-toolbar.readthedocs.io/en/latest/installation.html#prerequisites
INSTALLED_APPS += ["debug_toolbar"]  # noqa F405
# https://django-debug-toolbar.readthedocs.io/en/latest/installation.html#middleware
MIDDLEWARE += ["debug_toolbar.middleware.DebugToolbarMiddleware"]  # noqa F405
# https://django-debug-toolbar.readthedocs.io/en/latest/configuration.html#debug-toolbar-config
DEBUG_TOOLBAR_CONFIG = {
    "DISABLE_PANELS": ["debug_toolbar.panels.redirects.RedirectsPanel"],
    "SHOW_TEMPLATE_CONTEXT": True,
}
# https://django-debug-toolbar.readthedocs.io/en/latest/installation.html#internal-ips
INTERNAL_IPS = ["127.0.0.1", "10.0.2.2"]
if env("USE_DOCKER") == "yes":
    import socket

    hostname, _, ips = socket.gethostbyname_ex(socket.gethostname())
    INTERNAL_IPS += [ip[:-1] + "1" for ip in ips]

# django-extensions
# ------------------------------------------------------------------------------
# https://django-extensions.readthedocs.io/en/latest/installation_instructions.html#configuration
INSTALLED_APPS += ["django_extensions"]  # noqa F405

# Your stuff...
# ------------------------------------------------------------------------------
ALLOWED_HOSTS = [
    "192.168.0.118",
    "http://192.168.0.118/",
    "localhost",
    "127.0.0.1",
    "localhost",
    "0.0.0.0",
    "127.0.0.1",
    "bs-local.com",
    "django",
]
CORS_ORIGIN_WHITELIST = ["http://localhost:3000"]
CORS_ALLOWED_ORIGINS = ["http://localhost:3000", "http://192.168.0.118"]
CORS_ALLOWED_ORIGIN_REGEXES = [
    "http://localhost:3000",
    "http://192.168.0.118/",
    "192.168.0.118",
]
CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOW_CREDENTIALS = True
SESSION_COOKIE_HTTPONLY = False

# Frontend URL
FRONTEND_APPLICATION_URL = env(
    "DJANGO_FRONTEND_APPLICATION_URL", default="http://localhost:3000/"
)

# Email configs
EMAIL_BACKEND = env("DJANGO_EMAIL_BACKEND")
EMAIL_HOST = env("DJANGO_EMAIL_HOST")
EMAIL_PORT = env("DJANGO_EMAIL_PORT")
EMAIL_USE_TLS = env.bool("DJANGO_EMAIL_USE_TLS")
EMAIL_HOST_PASSWORD = env("DJANGO_EMAIL_HOST_PASSWORD")
EMAIL_HOST_USER = env("DJANGO_EMAIL_HOST_USER")
FROM_MAIL = "Workalove <noreply@workalove.com>"

# Debug configs
USE_TZ = False
DEFAULT_AUTO_FIELD = "django.db.models.AutoField"
