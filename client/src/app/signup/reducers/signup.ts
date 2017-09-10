import * as fromSignup from '../actions/signup';

export interface State {
  submitting: boolean;
  error: string | null;
}

export const initialState: State = {
  submitting: false,
  error: null
};

export function reducer(state = initialState, action: fromSignup.Actions): State {
  switch (action.type) {
    case fromSignup.SIGNUP:
      return {
        ...state,
        submitting: true
      };

    case fromSignup.SIGNUP_SUCCESS:
      return {
        ...state,
        submitting: false
      };

    case fromSignup.SIGNUP_FAILURE:
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
