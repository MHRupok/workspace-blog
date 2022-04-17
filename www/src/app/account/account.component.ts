import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  loginActive = "active";
  signupActive = "none";
  loginShow = "show active"
  signupShow = "none"
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login(username: any, password: any) {
    this.auth.login(username, password);

  }

  signup(username: string, email: string, password: string, password2: string) {
    this.auth.register(username, password, password2, email);
    console.log(username, password, email);
    
  }

  tab(val: any) {
    if (val == "login") {
      this.loginActive = "active"
      this.signupActive = "none"
      this.loginShow = "show active"
      this.signupShow = "none"
    }
    else {
      this.signupActive = "active show"
      this.loginActive = "none"
      this.loginShow = "none"
      this.signupShow = "show active"
    }

  }

}
