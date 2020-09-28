import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Templates } from '../models/templates';


const API_URL = environment.server + 'templates/';

@Injectable({
  providedIn: 'root'
})
export class TemplatesService {

  constructor(private http: HttpClient) { }

  getTemplates(q: string = '', offset: number = 1, limit: number = 10): Observable<Templates[]> {
    const url = API_URL + '?q=' + q + '&limit=' + limit + '&offset=' + offset;
    return this.http.get<Templates[]>(url);
  }

  add(template: Templates) {
    return this.http.post<Templates>(API_URL, template);
  }

  update(template: Templates) {
    return this.http.put<Templates>(API_URL + template.id , template);
  }

  delete(template: Templates) {
    return this.http.request('delete', API_URL + template.id);
  }

  upload(template: Templates, file: File) {
    const fd: FormData = new FormData();
    fd.append('file', file, file.name);
    fd.append('name', template.name);
    return this.http.post<Templates>(API_URL, fd);
  }
}
