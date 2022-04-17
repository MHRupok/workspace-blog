def is_user_authenticated(request):
    if request.user.is_authenticated:
        return True
    return False