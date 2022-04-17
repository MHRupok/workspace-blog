from functools import partial
from rest_framework.views import APIView
from rest_framework.response import Response
from account.serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User

from account.utils import check_old_password, is_password_equal


class Register(APIView):
    # use custom permission
    # permission_classes = [NotAuthenticated]
    def post(self, request):
        user_serializer = UserSerializer(data=request.data)
        if user_serializer.is_valid():
            user_serializer.save()
            return Response({"message": "user created."}, status=201)
            
        return Response({"error": user_serializer.errors}, status=400)

class Logout(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        request.user.auth_token.delete()
        return Response({"message": "Log out successfully"})

class ChangePassword(APIView):
    permission_classes = [IsAuthenticated]
    
    def put(self, request):
        if check_old_password(request, request.data["old_password"]):
            if is_password_equal(request.data["password1"], request.data["password2"]):
                request.user.set_password(request.data["password1"])
                return Response({"message": "password changed."})

            else:
                return Response({"message": "password is not equal."})
        else:
            return Response({"message": "old password is not correct."})
        