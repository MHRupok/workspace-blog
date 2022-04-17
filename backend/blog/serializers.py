from dataclasses import field
from operator import mod
from rest_framework import serializers
import os
from django.conf import settings
from blog.models import Comment, Post, Vote


class PostSerializer(serializers.ModelSerializer):

    author = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = Post
        fields = ("id", "title", "content", "author",
                  "upvote", "downvote", "created", "image")

    def create(self, validated_data):
        post = Post.objects.create(**validated_data)
        return post

    def update(self, instance, validated_data):
        instance.title = validated_data.get(
            "title", instance.title
        )
        instance.content = validated_data.get(
            "content", instance.content
        )
        instance.save()
        return instance

    def clean_image(self, value):
        initial_path = value.path
        new_path = settings.MEDIA_ROOT + value.name
        os.rename(initial_path, new_path)
        return value


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ("username", "content", "post")

    def create(self, validated_data):
        comment = Comment.objects.create(**validated_data)
        return comment

    def update(self, instance, validated_data):
        instance.content = validated_data.get(
            "content", instance.content
        )
        instance.save()
        return instance


class ShowComments(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'


class VoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vote
        fields = "__all__"

    def create(self, validate_data):
        vote = Vote.objects.create(**validate_data)
        return vote
