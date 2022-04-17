import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  baseUrl = 'http://127.0.0.1:8000/'
  isLoggedIn = false;

  login(username: any, password: any) {
    return this.http.post<any>(this.baseUrl + "account/login", {
      "username": username,
      "password": password

    }).subscribe((token) => {


      if (token) {
        this.isLoggedIn = true;
        sessionStorage.setItem("isLoggedIn", String(this.isLoggedIn))
        sessionStorage.setItem("token", token.token)
        this.router.navigate(['myaccount']);
      }

    })
  }



  getAuthStatus() {
    var log = sessionStorage.getItem("isLoggedIn");
    console.log("log", log)
    if (log == "true") {

      return true
    }
    return false
  }

  register(username: any, password: any, password2: any, email: any) {
    return this.http.post<any>(this.baseUrl + "account/register",
      {
        "username": username,
        "password": password,
        "password2": password2,
        "email": email
      }).subscribe((response) => {
        if (window.confirm(response['message'])) {
          window.location.reload();
        }


      }, error => {
        window.alert("Please Fill Up Correctly!");
      });


  }

  logout() {
    var token = sessionStorage.getItem("token");
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Accept', '*/*',)
      .set('Authorization', 'Token ' + token)
      .set('Connection', 'keep-alive');
    
    return this.http.post<any>(this.baseUrl + "account/logout", { headers: headers });
  }
}
