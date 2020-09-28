import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class BasicAuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with basic auth credentials if available
    const isAuthenticated = this.authService.isAuthenticated();
    if (isAuthenticated) {
      request = request.clone({
        headers: request.headers.set(
          'Authorization',
          `Bearer ${this.authService.token}`
        ),
      });
      request = request.clone({
        headers: request.headers.set('Accept', 'application/json'),
      });
    }
    return next.handle(request);
  }
}
