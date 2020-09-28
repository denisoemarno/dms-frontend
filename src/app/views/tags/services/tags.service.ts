import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tags } from '../models/tags';


const API_URL = environment.server + 'tags/';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(private http: HttpClient) { }

  getTags(q: string = '', offset: number = 1, limit: number = 10): Observable<Tags[]> {
    const url = API_URL + '?q=' + q + '&limit=' + limit + '&offset=' + offset;
    return this.http.get<Tags[]>(url);
  }

  add(tags: Tags) {
    return this.http.post<Tags>(API_URL, tags);
  }

  update(tags: Tags) {
    return this.http.put<Tags>(API_URL + tags.id , tags);
  }

  delete(tags: Tags) {
    return this.http.request('delete', API_URL + tags.id);
  }

}
