import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

  baseUrl = 'http://127.0.0.1:8000/'
  pageSkip = 10;
  page = 0;
  pageLimit = 10;

  geallBlogs() {
    // return this.http.get<any>(this.baseUrl, { params: { limit: this.pageLimit.toString(), skip: pageskip.toString() } });
    return this.http.get<any>(this.baseUrl);
  }

  getDetails(val: any) {
    return this.http.get<any>(this.baseUrl + "post/" + val);
  }

  getMyBlogs() {
    var token = sessionStorage.getItem("token");

    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Accept', '*/*',)
      .set('Authorization', 'Token ' + token);

    return this.http.get<any>(this.baseUrl + "myblogs", { headers: headers });

  }

  createBlog(title: any, content: any) {
    var token = sessionStorage.getItem("token");
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Accept', '*/*',)
      .set('Authorization', 'Token ' + token);

    return this.http.post<any>(this.baseUrl + "create_post", { "title": title, "content": content }, { headers: headers });
  }

  deleteBlog(id: any) {
    var token = sessionStorage.getItem("token");
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Accept', '*/*',)
      .set('Authorization', 'Token ' + token);

    return this.http.delete<any>(this.baseUrl + "delete_post/" + id, { headers: headers });
  }

  editBlog(title: any, content: any, id: any) {
    var token = sessionStorage.getItem("token");
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Accept', '*/*',)
      .set('Authorization', 'Token ' + token);

    return this.http.put<any>(this.baseUrl + "update_post/" + id, { "title": title, "content": content }, { headers: headers });
  }

  postComment(id: any, content: any) {
    var token = sessionStorage.getItem("token");
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Accept', '*/*',)
      .set('Authorization', 'Token ' + token);
    return this.http.post<any>(this.baseUrl + "create_comment/" + id, { "content": content }, { headers: headers });

  }

  vote(id: any, vote: any) {
    var token = sessionStorage.getItem("token");
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Accept', '*/*',)
      .set('Authorization', 'Token ' + token);
    return this.http.post<any>(this.baseUrl + "do_vote/" + id, { "vote": vote }, { headers: headers });

  }
}
