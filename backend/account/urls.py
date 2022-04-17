from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from account.views import ChangePassword, Logout, Register


urlpatterns = [
    path("register", Register.as_view()),
    path("login", obtain_auth_token),
    path("logout", Logout.as_view()),
    path("change_password", ChangePassword.as_view()),
]
