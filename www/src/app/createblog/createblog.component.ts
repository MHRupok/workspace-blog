import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-createblog',
  templateUrl: './createblog.component.html',
  styleUrls: ['./createblog.component.css']
})
export class CreateblogComponent implements OnInit {

  constructor(private auth: AuthService, private blog: BlogService, private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.auth.logout().subscribe((response) => {
      console.log(response);

    })
  }

  postBlog(title: any, content: any) {
    this.blog.createBlog(title, content).subscribe((response) => {
      window.alert("Blog successfully posted!");
      this.router.navigate(['myaccount']);

    }, error => {
      window.alert("Error!");

    })
  }

}
