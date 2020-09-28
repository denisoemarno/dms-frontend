import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post';


const API_URL = environment.server + 'posts/';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getPost(q: string = '', offset: number = 1, limit: number = 10): Observable<Post[]> {
    const url = API_URL + '?q=' + q + '&limit=' + limit + '&offset=' + offset;
    return this.http.get<Post[]>(url);
  }

  add(post: Post) {
    return this.http.post<Post>(API_URL, post);
  }

  update(post: Post) {
    return this.http.put<Post>(API_URL + post.id , post);
  }

  delete(post: Post) {
    return this.http.request('delete', API_URL + post.id);
  }

}
