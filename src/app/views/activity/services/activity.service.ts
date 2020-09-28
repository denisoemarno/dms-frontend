import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Activity } from 'src/app/views/activity/models/activity';


const API_URL = environment.server + 'activity/';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  
  constructor(private http: HttpClient) { }

  getActivity(q: string = '', offset: number = 1, limit: number = 10): Observable<Activity[]> {
    const url = API_URL + '?q=' + q + '&limit=' + limit + '&offset=' + offset;
    return this.http.get<Activity[]>(url);
  }

  getbyid(id: number): Observable<Activity[]> {
    const url = API_URL + id;
    return this.http.get<Activity[]>(url);
  }
}
