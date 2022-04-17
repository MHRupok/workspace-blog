from rest_framework import serializers
from django.contrib.auth.models import User

from account.utils import check_user_exists

class UserSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    password2 = serializers.CharField()
    email = serializers.EmailField()

    def validate(self, data):
        if data.get("password") != data.get("password2"):
            raise serializers.ValidationError("password must be equal.")
        
        elif check_user_exists(data.get("username")):
            raise serializers.ValidationError("username exists.")
        
        return data

    def create(self, validated_data):
        user = User.objects.create_user(
            username = validated_data["username"],
            password = validated_data["password"],
            email = validated_data["email"],
        )
        user.save()
        return user

    # def update(self, instance, validated_data):
    #     instance.username = validated_data.get(
    #         "username", instance.username
    #     )
    #     instance.password = validated_data.get(
    #         "password", instance.password
    #     )
    #     instance.email = validated_data.get(
    #         "email", instance.email
    #     )

    #     instance.save()
    #     return instance