import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-post-model',
  templateUrl: './post-model.component.html',
  styleUrls: ['./post-model.component.css']
})
export class PostModelComponent implements OnInit {
  @Input() blogList: any;
  base = "http://127.0.0.1:8000"
  constructor(private blog: BlogService, private router: Router) {


  }

  ngOnInit(): void {
  
  }

  showDetails(val: any) {
    this.router.navigate(["post/" + val]);

  }



}
