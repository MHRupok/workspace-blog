from django.contrib.auth.models import User

def check_user_exists(username):
    user = User.objects.filter(username=username)
    if user:
        return True
    return False

def is_password_equal(password1, password2):
    if password1 == password2:
        return True
    return False

def check_old_password(request, password):
    if request.user.check_password(password):
        return True
    return False
