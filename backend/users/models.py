from autoslug import AutoSlugField
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import PermissionsMixin, UserManager
from django.db import models
from django.utils import timezone as djangotimezone


class CustomUserManager(UserManager):
    def _create_user(self, email, password, **extra_fields):
        email = self.normalize_email(email)
        user = User(email=email, **extra_fields)
        user.password = make_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        assert extra_fields["is_staff"]
        assert extra_fields["is_superuser"]
        return self._create_user(email, password, **extra_fields)


class Link(models.Model):
    link = models.URLField()

    def __str__(self):
        return str(self.link)[:30] if len(str(self.link)) > 30 else str(self.link)


class GeneratedAvatar(models.Model):
    first_color = models.CharField(max_length=6)
    second_color = models.CharField(max_length=6)

    def __str__(self):
        return f"{self.first_color} {self.second_color}"


class User(AbstractBaseUser, PermissionsMixin):
    avatar = models.ImageField(upload_to="avatars/", null=True, blank=True)
    generated_avatar = models.ForeignKey(GeneratedAvatar, on_delete=models.PROTECT)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.EmailField(max_length=254, unique=True)
    username = models.CharField(max_length=100, unique=True)
    description = models.TextField(null=True, blank=True)
    timezone = models.FloatField(null=True, blank=True)
    links = models.ManyToManyField(Link, related_name="users")
    is_staff = models.BooleanField(verbose_name="staff status", default=False)
    is_active = models.BooleanField(verbose_name="active", default=True)
    date_joined = models.DateTimeField(
        verbose_name="date joined", default=djangotimezone.now
    )

    objects = CustomUserManager()

    EMAIL_FIELD = "email"
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ("first_name", "last_name")

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"
        ordering = ["-id"]

    def clean(self):
        super().clean()
        self.email = self.__class__.objects.normalize_email(self.email)

    def get_full_name(self):
        full_name = "%s %s" % (self.first_name, self.last_name)
        return full_name.strip()
