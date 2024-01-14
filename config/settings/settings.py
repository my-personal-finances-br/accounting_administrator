import environ

ROOT_DIR = environ.Path(__file__) - 3
APPS_DIR = ROOT_DIR.path("accounting_admin")

env = environ.Env()

READ_DOT_ENV_FILE = env.bool("DJANGO_READ_DOT_ENV_FILE", default=False)
if READ_DOT_ENV_FILE:
    env.read_env(str(ROOT_DIR.path(".env")))


LOCALE_PATHS = [str(ROOT_DIR.path("locale"))]

SITE_ID = 1
USE_I18N = True
USE_L10N = True
APPEND_SLASH = True

DJANGO_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.sites",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework_swagger",
    "debug_toolbar",
    "django_extensions",
]
THIRD_PARTY_APPS = [
    "rest_framework",
    "corsheaders",
]
LOCAL_APPS = [
    "accounting_admin.core.users.apps.UsersAppConfig",
    "accounting_admin.core.expense.apps.ExpenseAppConfig",
    "accounting_admin.core.salary.apps.SalaryAppConfig",
    "accounting_admin.core.holidays.apps.HolidayAppConfig",
    "accounting_admin.core.banks.apps.BankAppConfig",
    "accounting_admin.core.credit_cards.apps.CreditCardAppConfig",
]

INSTALLED_APPS = DJANGO_APPS + THIRD_PARTY_APPS + LOCAL_APPS

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "debug_toolbar.middleware.DebugToolbarMiddleware",
]


ROOT_URLCONF = "config.urls"

DEBUG = True
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
            "libraries": {
                "staticfiles": "django.templatetags.static",
            },
            "debug": DEBUG,
        },
    },
]


DATABASES = {
    "default": {
        "ENGINE": "dj_db_conn_pool.backends.postgresql",
        "ATOMIC_REQUESTS": True,
        **env.db("DATABASE_URL"),
    }
}
AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

LANGUAGE_CODE = "pt-br"

TIME_ZONE = "America/Sao_Paulo"

ADMIN_URL = "admin"

STATIC_ROOT = str(ROOT_DIR("staticfiles"))
STATIC_URL = "/static/"
STATICFILES_DIRS = [str(APPS_DIR.path("static"))]

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework.authentication.SessionAuthentication",
        "rest_framework.authentication.BasicAuthentication",
    ),
    "DEFAULT_SCHEMA_CLASS": "rest_framework.schemas.coreapi.AutoSchema",
}

AUTHENTICATION_BACKENDS = ["django.contrib.auth.backends.ModelBackend"]
AUTH_USER_MODEL = "users.User"

SECRET_KEY = env(
    "DJANGO_SECRET_KEY",
    default="YOSotCpdJ9Lkbukgq1igmVldbuQpbFOle1wOWPz7GxGO0C5FPGEPiA51kvXnvnr8",
)

CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.locmem.LocMemCache",
        "LOCATION": "",
    }
}

DEBUG_TOOLBAR_CONFIG = {
    "DISABLE_PANELS": ["debug_toolbar.panels.redirects.RedirectsPanel"],
    "SHOW_TEMPLATE_CONTEXT": True,
}
INTERNAL_IPS = ["127.0.0.1", "10.0.2.2"]
if env("USE_DOCKER") == "yes":
    import socket

    hostname, _, ips = socket.gethostbyname_ex(socket.gethostname())
    INTERNAL_IPS += [ip[:-1] + "1" for ip in ips]

ALLOWED_HOSTS = [
    "ec2-3-82-193-76.compute-1.amazonaws.com",
    "localhost:8000",
    "localhost",
    "accounting-administrator.igor-aws.link"
]

CSRF_TRUSTED_ORIGINS = [
    "http://localhost:3000",
    "http://ec2-3-82-193-76.compute-1.amazonaws.com:3000",
    "http://ec2-3-82-193-76.compute-1.amazonaws.com",
    "http://accounting-administrator.igor-aws.link:8000",
    "http://accounting-administrator.igor-aws.link"
]
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://ec2-3-82-193-76.compute-1.amazonaws.com:3000",
    "http://ec2-3-82-193-76.compute-1.amazonaws.com",
    "http://accounting-administrator.igor-aws.link:8000",
    "http://accounting-administrator.igor-aws.link"
]

CORS_ALLOW_CREDENTIALS = True
SESSION_COOKIE_HTTPONLY = False

FRONTEND_APPLICATION_URL = env(
    "DJANGO_FRONTEND_APPLICATION_URL", default="http://localhost:3000/"
)

USE_TZ = False
DEFAULT_AUTO_FIELD = "django.db.models.AutoField"
