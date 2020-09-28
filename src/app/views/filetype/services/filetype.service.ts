import { Injectable } from '@angular/core';
import { Filetype } from '../models/filetype';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL = environment.server + 'file-types/';

@Injectable({
  providedIn: 'root',
})
export class FiletypeService {
  constructor(private http: HttpClient) {}

  getFiletype(q: string = '', offset: number = 1, limit: number = 10): Observable<Filetype[]> {
    const url = API_URL + '?q=' + q + '&limit=' + limit + '&offset=' + offset;
    return this.http.get<Filetype[]>(url);
  }

  add(filetype: Filetype) {
    return this.http.post<Filetype>(API_URL, filetype);
  }

  delete(filetype: Filetype) {
    return this.http.request('delete', API_URL + filetype.id);
  }

  update(filetype: Filetype) {
    return this.http.put<Filetype>(API_URL + filetype.id, filetype);
  }
}
