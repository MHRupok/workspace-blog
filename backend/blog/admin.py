from django.contrib import admin
from .models import Comment, Post, Vote

# Register your models here.


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author')
    actions = None


admin.site.register(Comment)
admin.site.register(Vote)