import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Users } from '../models/users';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL = environment.server + 'users/';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<Users> {
    return this.http.post<Users>(API_URL + 'login', { email, password });
  }

  logout() {
    localStorage.removeItem(environment.authTokenKey);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(environment.authTokenKey);
    return token ? true : false;
  }

  public get token(): string {
    return localStorage.getItem(environment.authTokenKey);
  }
}
