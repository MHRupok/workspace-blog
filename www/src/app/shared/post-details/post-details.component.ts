import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';


@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {

  comments: any;
  title: any;
  author: any;
  content: any;
  time: any;
  upvote: any;
  downvote: any;
  commentBtn = "";
  image:any;
  id: any;
  base = "http://127.0.0.1:8000"
  constructor(private activatedRoute: ActivatedRoute, private blog: BlogService, private router: Router) {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.blog.getDetails(id).subscribe((details) => {
      this.id = details.data.id;
      this.title = details.data.title;
      this.author = details.data.author;
      this.content = details.data.content;
      this.time = details.data.created;
      this.upvote = details.data.upvote;
      this.downvote = details.data.downvote;
      this.image = details.data.image;
      this.comments = details['comments'];

    })

  }

  ngOnInit(): void {
  }

  postComment(comment: any) {
    let log = window.sessionStorage.getItem("isLoggedIn")

    if (comment.length == 0) {
      window.alert("Please provide valid comment!")
    }

    if (log != "true") {
      window.alert("Please login first!")
    }

    else {
      this.blog.postComment(this.id, comment).subscribe((response) => {
        window.location.reload()
      }, error => {
        window.alert("Error!");
      })
    }


  }

  vote(val: any) {
    var token = sessionStorage.getItem("token");
    if (token == null) {
      this.router.navigate(['login']);
      window.alert("You must login first!")

    }

    else if (val == 'up') {
      this.blog.vote(this.id, 1).subscribe((response) => {

        window.location.reload();
        window.alert(response.message);
      }, error => {
        window.alert(error.message);
      })
    }
    else {
      this.blog.vote(this.id, -1).subscribe((response) => {

        window.location.reload();
        window.alert(response.message);
      }, error => {
        window.alert(error.message);
      })
    }
  }

}
