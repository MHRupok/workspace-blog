from curses.ascii import US
from statistics import mode
from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator
import datetime


class Post(models.Model):
    title = models.CharField(max_length=250)
    content = models.TextField()
    author = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, blank=True)
    upvote = models.IntegerField(default=0)
    downvote = models.IntegerField(default=0)
    created = models.DateTimeField(auto_now=False, auto_now_add=True)
    image = models.ImageField(upload_to='media', blank=True, null=True)

    def __str__(self) -> str:
        return self.title


class Comment(models.Model):
    username = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, blank=True)
    content = models.TextField(max_length=1500)
    created = models.DateTimeField(auto_now_add=True)
    post = models.ForeignKey(
        Post, on_delete=models.CASCADE,  null=True, blank=True)


class Vote(models.Model):
    post = models.ForeignKey(
        Post, on_delete=models.CASCADE,  null=True, blank=True)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, blank=True)
    vote = models.IntegerField(default=0)
