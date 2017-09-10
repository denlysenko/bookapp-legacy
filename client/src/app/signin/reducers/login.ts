import * as fromLogin from '../actions/login';

export interface State {
  submitting: boolean;
  error: string | null;
}

export const initialState: State = {
  submitting: false,
  error: null
};

export function reducer(state = initialState, action: fromLogin.Actions): State {
  switch (action.type) {
    case fromLogin.LOGIN:
      return {
        ...state,
        submitting: true
      };

    case fromLogin.LOGIN_SUCCESS:
      return {
        ...state,
        submitting: false
      };

    case fromLogin.LOGIN_FAILURE:
      return {
        ...state,
        submitting: false,
        error: action.payload
      };

    default:
      return state;
  }
}

export const getError = (state: State) => state.error;
export const getSubmitting = (state: State) => state.submitting;
