import os
from datetime import timedelta
from pathlib import Path
from dotenv import load_dotenv

load_dotenv(".env")

BASE_DIR = Path(__file__).resolve().parent.parent

DEBUG = True

if not os.environ.get("DOCKER_ENV", None):
    IS_LOCAL = True
else:
    IS_LOCAL = False

if DEBUG:
    SECRET_KEY = "test"
else:
    SECRET_KEY = os.getenv("SECRET_KEY")

ALLOWED_HOSTS = ["*"]
CSRF_TRUSTED_ORIGINS = ["http://localhost:8241"]


INSTALLED_APPS = [
    "core",
    # "modeltranslation",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django_dump_load_utf8",
    "rest_framework",
    "users",
    "teams",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "project.urls"


DATA_URL = "data/"
DATA_ROOT = os.path.join(BASE_DIR, "core", "data")

STATIC_URL = "static/"
STATIC_ROOT = os.path.join(BASE_DIR, "static")

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "core", "static"),
]

TEMPLATES_DIR = os.path.join(BASE_DIR, "core", "templates")

MEDIA_URL = "media/"
MEDIA_ROOT = os.path.join(BASE_DIR, "core", "data", "media")

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [TEMPLATES_DIR],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "project.wsgi.application"
ASGI_APPLICATION = "grocket.asgi.application"

AUTH_USER_MODEL = "users.User"

if IS_LOCAL:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": BASE_DIR / "db.sqlite3",
        }
    }
else:
    DATABASES = {
        "default": {
            "ENGINE": os.getenv("DB_ENGINE"),
            "NAME": os.getenv("DB_NAME"),
            "USER": os.getenv("POSTGRES_USER"),
            "PASSWORD": os.getenv("POSTGRES_PASSWORD"),
            "HOST": os.getenv("DB_HOST"),
            "PORT": os.getenv("DB_PORT"),
        }
    }


AUTH_PASSWORD_VALIDATORS = [
    # {
    #     "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    # },
    # {
    #     "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    # },
    # {
    #     "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    # },
    # {
    #     "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    # },
]


LANGUAGES = [
    ("en", "English"),
    ("ru", "Russian"),
]

LOCALE_PATHS = [
    BASE_DIR / "core/locale/",
]

MODELTRANSLATION_DEFAULT_LANGUAGE = "en"

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_L10N = True

USE_TZ = True


DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticated",
    ],
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ],
    "DEFAULT_PAGINATION_CLASS": ...,
    "PAGE_SIZE": ...,
    "EXCEPTION_HANDLER": "rest_framework.views.exception_handler",
    "DEFAULT_THROTTLE_CLASSES": [
        "rest_framework.throttling.AnonRateThrottle",
        "rest_framework.throttling.UserRateThrottle",
    ],
    "DEFAULT_THROTTLE_RATES": {"anon": "100000/day", "user": "100000/day"},
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=100000),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=100000),
    "UPDATE_LAST_LOGIN": False,
    "AUTH_HEADER_TYPES": ("Bearer",),
}


AVATAR = {
    "GRADIENTS": [
        ("a18cd1", "fbc2eb"),
        ("ff9a9e", "fecfef"),
        ("f6d365", "fda085"),
        ("d4fc79", "96e6a1"),
        ("84fab0", "8fd3f4"),
        ("fccb90", "d57eeb"),
        ("f093fb", "f5576c"),
        ("30cfd0", "330867"),
        ("a8edea", "fed6e3"),
        ("5ee7df", "b490ca"),
        ("d299c2", "fef9d7"),
        ("9890e3", "b1f4cf"),
        ("96fbc4", "f9f586"),
        ("2af598", "009efd"),
        ("74ebd5", "9face6"),
    ],
    "SIZE": (500, 500),
    "FORMAT": "webp",
}

INTEGER_TIMEZONES = [timezone for timezone in range(-12, 15)]
FLOAT_TIMEZONES = [-9.5, -3.5, 3.5, 4.5, 5.5, 5.75, 6.5, 8.75, 9.5, 10.5, 12.75]
TIMEZONES = INTEGER_TIMEZONES + FLOAT_TIMEZONES

USERNAME_POSTFIX_RANGE = (10000, 99999)
