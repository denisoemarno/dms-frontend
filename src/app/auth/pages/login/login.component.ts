import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { finalize, takeUntil, tap, catchError } from 'rxjs/operators';
import { Login } from '../../actions/auth.actions';
import { Subject, of, Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  
  isLoggedIn$: Observable<boolean>;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private store: Store<AppState>,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      email: [
        'henry@ogya.co.id',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(320),
        ]),
      ],
      password: [
        '123456',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
    });
  }

  submit() {
    this.auth
      .login(
        this.loginForm.get('email').value,
        this.loginForm.get('password').value
      ).pipe(
        tap((users) => {
          if (users) {
            this.store.dispatch(new Login({ token: users.token }));
            this.router.navigateByUrl('/');
          }
        }),
        finalize(() => {
          this.cdr.markForCheck();
        }),
        catchError(error => {
          console.log(error);
          return of(false);
        })
      )
      .subscribe();
  }
}
