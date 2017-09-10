import { User } from '../models/User';
import * as fromAuth from '../actions/auth';

export interface State {
  user: User | null;
  loggedIn: boolean;
}

export const initialState: State = {
  user: null,
  loggedIn: false
};

export function reducer(state = initialState, action: fromAuth.Actions): State {
  switch (action.type) {
    case fromAuth.LOAD_LOGGED_USER_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        user: action.payload
      };

    case fromAuth.LOGOUT_SUCCESS:
      return initialState;

    default:
      return state;
  }
}

export const getUser = (state: State) => state.user;
export const getLoggedIn = (state: State) => state.loggedIn;