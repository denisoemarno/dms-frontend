import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from 'src/app/auth/models/users';


const API_URL = environment.server + 'users/';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers(q: string = '', offset: number = 1, limit: number = 10): Observable<Users[]> {
    const url = API_URL + '?q=' + q + '&limit=' + limit + '&offset=' + offset;
    return this.http.get<Users[]>(url);
  }

  register(users: Users) {
    return this.http.post<Users>(API_URL + 'register' , users);
  }

  delete( users: Users) {
    return this.http.request('delete', API_URL + users.id);
  }

  update( users: Users) {
    return this.http.put<Users>(API_URL + users.id , users);
  }

  profile() {
    return this.http.get<Users>(API_URL + 'me');
  }

  updateprofile( users: Users) {
    return this.http.put<Users>(API_URL+ 'update-profile/me', users);
  }
}
