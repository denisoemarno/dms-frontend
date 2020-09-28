import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { filter, mergeMap, tap, withLatestFrom } from 'rxjs/operators';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store, select } from '@ngrx/store';

import {
  AuthActionTypes,
  Login,
  Logout,
  UserLoaded,
  UserRequested,
} from '../actions/auth.actions';

import { AppState } from '../../reducers';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';
import { isUserLoaded } from '../selectors/auth.selectors';
import { Observable, defer, of } from 'rxjs';


@Injectable()
export class AuthEffects {
  @Effect({ dispatch: false })
  login$ = this.actions$.pipe(
    ofType<Login>(AuthActionTypes.Login),
    tap((action) => {
      localStorage.setItem(environment.authTokenKey, action.payload.token);
      this.store.dispatch(new UserRequested());
    })
  );

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType<Logout>(AuthActionTypes.Logout),
    tap(() => {
      localStorage.removeItem(environment.authTokenKey);
      this.router.navigate(['/auth/login']);
    })
  );
  
  @Effect()
    init$: Observable<Action> = defer(() => {
        const userToken = localStorage.getItem(environment.authTokenKey);
        let observableResult = of({type: 'NO_ACTION'});
        if (userToken) {
            observableResult = of(new Login({  token: userToken }));
        }
        return observableResult;
    });

  constructor(
    private actions$: Actions,
    private router: Router,
    private auth: AuthService,
    private store: Store<AppState>
  ) {}
}
