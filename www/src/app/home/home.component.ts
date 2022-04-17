import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  index = 12;
  blogList: any;
  constructor(private blog: BlogService) {
    this.callApi();
  }

  ngOnInit(): void {
  }

  callApi() {
    this.blog.geallBlogs().subscribe((blogs) => {

      this.blogList = blogs['data'];
      console.log(this.blogList);
      
    })

  }

}
