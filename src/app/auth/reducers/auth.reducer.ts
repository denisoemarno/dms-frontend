import { Action, createReducer, on } from '@ngrx/store';
import { Users } from '../models/users';
import { AuthActionTypes, AuthActions } from '../actions/auth.actions';


export const authFeatureKey = 'auth';

export interface AuthState {
  loggedIn: boolean;
  authToken: string;
  user: Users;
  isUserLoaded: boolean;
}


export const initialAuthState: AuthState = {
  loggedIn: false,
  authToken: undefined,
  user: undefined,
  isUserLoaded: false
};


export function authReducer(state = initialAuthState, action: AuthActions): AuthState {
  switch (action.type) {
      case AuthActionTypes.Login: {
          const _token: string = action.payload.token;
          return {
              loggedIn: true,
              authToken: _token,
              user: undefined,
              isUserLoaded: false
          };
      }

      case AuthActionTypes.Logout:
          return initialAuthState;

      case AuthActionTypes.UserLoaded: {
          const _user: Users = action.payload.user;
          return {
              ...state,
              user: _user,
              isUserLoaded: true
          };
      }

      default:
          return state;
  }
}

