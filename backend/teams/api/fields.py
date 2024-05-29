from rest_framework.fields import CharField, BooleanField
from rest_framework.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

from .. import selectors


class PasswordField(CharField):
    style = {"input_type": "password"}

    def run_validators(self, password):
        super().run_validators(password)

        if not self.context["user"].check_password(password):
            raise ValidationError(_("Password is incorrect"))

        return password
