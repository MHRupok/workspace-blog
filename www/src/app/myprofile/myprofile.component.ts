import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {
  blogList: any;

  constructor(private blog: BlogService, private auth: AuthService, private router: Router) {
    blog.getMyBlogs().subscribe((blogs) => {
      console.log(blogs);
      this.blogList = blogs['data']


    }, error => {
      console.log(error.status);

    })
  }

  ngOnInit(): void {
  }

  logout() {
    window.localStorage.clear();
    this.router.navigate(["login"]);
    this.auth.logout().subscribe((response) => {


    })
  }

  editBlog(val: any) {
    this.router.navigate(["myaccount/edit/" + val]);

  }

  deleteBlog(val: any) {
    if (confirm("Want to delete?")) {
      this.blog.deleteBlog(val).subscribe((response) => {

        window.location.reload();

      }, error => {
        window.alert("Error!")

      })

    }
  }

}
