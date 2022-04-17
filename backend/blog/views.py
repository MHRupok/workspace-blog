from functools import partial
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.core.serializers import serialize

from .serializers import CommentSerializer, PostSerializer, VoteSerializer
from rest_framework.generics import get_object_or_404
from .models import Post, Comment, Vote
from django.db import connection
import json


# Create your views here.
class IndexView(APIView):
    def get(self, request):
        posts = Post.objects.all()
        post_serializer = PostSerializer(posts, many=True)
        return Response({"data": post_serializer.data})


class CreatePostView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        post_serializer = PostSerializer(data=request.data)
        if post_serializer.is_valid():
            post_serializer.validated_data["author"] = request.user
            post_serializer.save()
            return Response({"message": "post created."})
        else:
            return Response({"error": post_serializer.errors})


class ShowMyBlog(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        posts = Post.objects.filter(author_id=request.user.id)
        post_serializer = PostSerializer(posts, many=True)
        return Response({"data": post_serializer.data})


class ShowPostView(APIView):
    def get(self, request, post_id):
        post = get_object_or_404(Post, id=post_id)
        cursor2 = connection.cursor()
        com2 = cursor2.execute(
            "SELECT * FROM blog_post WHERE id = %s", [post_id])
        com2 = cursor2.fetchone()
        print(">>>>>>")
        temp = Post.objects.all()
        temp2 = PostSerializer(instance=temp)
        print(temp2.data)
        post_serializer = PostSerializer(instance=post)
        comments = get_object_or_404(Comment, id=post_id)
        comment_serializer = CommentSerializer(instance=comments)
        comment_data = comment_serializer.data
        data = post_serializer.data
        cursor = connection.cursor()
        com = cursor.execute(
            "SELECT * FROM blog_comment WHERE post_id = %s", [post_id])
        com = cursor.fetchall()
        # print(data)
        if('Authorization' in request.headers):

            key = request.headers['Authorization']
            key = key.replace("Token ", "")
            user = cursor.execute(
                "SELECT * FROM authtoken_token WHERE key = %s", [key])
            user = cursor.fetchone()
            vote = Vote.objects.filter(
                post_id=post_id, user_id=user[2]).first()
            return Response({"data": data, "comments": comment_data, "votes": vote.vote})
        else:
            return Response({"data": data, "comments": com})


class ShowPostsView(APIView):
    def get(self, request, post_id):
        post = get_object_or_404(Post, id=post_id)
        post_serializer = PostSerializer(instance=post)
        data = post_serializer.data
        cursor = connection.cursor()
        com = cursor.execute(
            "SELECT * FROM blog_comment WHERE post_id = %s", [post_id])
        com = cursor.fetchall()
        comment_number = Comment.objects.filter(id=post_id).count()

        if(comment_number > 0):
            comments = get_object_or_404(Comment, id=post_id)
            comment_serializer = CommentSerializer(instance=comments)
            comment_data = comment_serializer.data
        if('Authorization' in request.headers):

            key = request.headers['Authorization']
            key = key.replace("Token ", "")
            user = cursor.execute(
                "SELECT * FROM authtoken_token WHERE key = %s", [key])
            user = cursor.fetchone()
            vote = Vote.objects.filter(
                post_id=post_id, user_id=user[2]).first()
            return Response({"data": data, "comments": comment_data, "votes": vote.vote})
        else:
            return Response({"data": data, "comments": com})


class UpdatePostView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, post_id):
        post = get_object_or_404(Post, id=post_id)
        post_serializer = PostSerializer(
            instance=post,
            data=request.data,
            partial=True
        )
        if post_serializer.is_valid():
            post_serializer.save()
            return Response({"message": "post updated."})
        else:
            return Response({"error": post_serializer.errors})


class DeletePostView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, post_id):
        post = get_object_or_404(Post, id=post_id)
        post.delete()
        return Response({"message": "post deleted."})


class CreateCommentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, post_id):
        post = get_object_or_404(Post, id=post_id)
        comment_serializer = CommentSerializer(data=request.data)
        if comment_serializer.is_valid():
            comment_serializer.validated_data['post'] = post
            comment_serializer.validated_data['username'] = request.user

            comment_serializer.save()
            return Response({"message": "comment created."})
        else:
            return Response({"error": comment_serializer.errors})


class VoteView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, post_id):
        if(request.data['vote'] > 1 or request.data['vote'] < -1 or request.data['vote'] == 0):
            return Response({"error": "vote correctly"})
        post = get_object_or_404(Post, id=post_id)
        vote = Vote.objects.filter(
            user_id=request.user, post_id=post_id).count()
        vote_type = Vote.objects.filter(
            user_id=request.user, post_id=post_id).first()
        curr_vote = request.data['vote']
        upvotes = post.upvote
        downvotes = post.downvote
        if vote > 0:
            if int(curr_vote) == int(vote_type.vote):
                return Response({"message": "Already voted"})
            else:
                vote_update_serializer = VoteSerializer(
                    instance=vote_type, data=request.data, partial=True)
                if vote_update_serializer.is_valid():
                    vote_update_serializer.save()
                    if(curr_vote == 1):
                        post.upvote = upvotes + 1
                        post.downvote = downvotes - 1
                        post.save()
                    if(curr_vote == -1):
                        post.upvote = upvotes - 1
                        post.downvote = downvotes + 1
                        post.save()
                    return Response({"message": "vote updated"})
        else:
            vote_serializer = VoteSerializer(data=request.data)
            if(curr_vote == 1):
                serialzer = PostSerializer(
                    instance=post, data={'upvote': upvotes}, partial=True)
                if serialzer.is_valid():
                    post.upvote = upvotes + 1
                    post.save()
            if(curr_vote == -1):
                serialzer = PostSerializer(
                    post, data={'downvote': downvotes}, partial=True)
                if serialzer.is_valid():
                    post.downvote = downvotes + 1
                    post.save()
            if vote_serializer.is_valid():
                vote_serializer.validated_data['post'] = post
                vote_serializer.validated_data['user'] = request.user
                vote_serializer.save()
                return Response({"message": "Voted"})
            else:
                return Response({"error": vote_serializer.errors})
