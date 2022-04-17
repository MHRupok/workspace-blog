import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-editblog',
  templateUrl: './editblog.component.html',
  styleUrls: ['./editblog.component.css']
})
export class EditblogComponent implements OnInit {

  title: any;
  content: any;
  title_edited: any;
  content_edited: any;
  id: any;


  constructor(private blog: BlogService, private activatedRoute: ActivatedRoute, private router: Router) {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.blog.getDetails(id).subscribe((details) => {

      this.title = details.data.title;
      this.content = details.data.content;
      this.id = details.data.id;


    })
  }

  ngOnInit(): void {
  }

  postBlog(title: any, content: any) {
    this.blog.editBlog(title, content, this.id).subscribe((response) => {
      window.alert("Successfully Updated!")
      this.router.navigate(["myaccount"]);

    }, error => {
      window.alert("Error!")
    })

  }

}
