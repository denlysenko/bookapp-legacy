import { User } from '../models/User';
import * as fromAuth from '../actions/auth';
import { LOGIN_SUCCESS, LOGOUT } from '../actions/auth';

export interface State {
  loggedIn: boolean;
  user: User | null;
}

export const initialState: State = {
  loggedIn: false,
  user: null
};

export function reducer(state = initialState, action: fromAuth.Actions): State {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        user: action.payload
      };

    case LOGOUT:
      return initialState;

    default:
      return state;
  }
}

export const getLoggedIn = (state: State) => state.loggedIn;
export const getUser = (state: State) => state.user;
