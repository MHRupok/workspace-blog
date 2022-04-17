from django.urls import path
from django.conf import settings
from blog.views import CreateCommentView, CreatePostView, DeletePostView, IndexView, ShowPostsView, UpdatePostView, VoteView, ShowMyBlog
from django.conf.urls.static import static

urlpatterns = [
    path("", IndexView.as_view()),
    path("create_post", CreatePostView.as_view()),
    path("post/<int:post_id>", ShowPostsView.as_view()),
    path("update_post/<int:post_id>", UpdatePostView.as_view()),
    path("delete_post/<int:post_id>", DeletePostView.as_view()),
    path("create_comment/<int:post_id>", CreateCommentView.as_view()),
    path("do_vote/<int:post_id>", VoteView.as_view()),
    path("myblogs", ShowMyBlog.as_view()),


] + static (settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
