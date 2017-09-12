import * as RestorePassword from '../actions/restore-password';

export interface State {
  submitting: boolean;
  success: boolean;
  error: string | null;
}

export const initialState: State = {
  success: false,
  submitting: false,
  error: null
};

export function reducer(state = initialState, action: RestorePassword.Actions): State {
  switch (action.type) {
    case RestorePassword.FORGOT_PASSWORD:
      return {
        ...state,
        submitting: true,
        error: null,
        success: false
      };

    case RestorePassword.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        submitting: false,
        success: true
      };

    case RestorePassword.FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        submitting: false,
        error: action.payload
      };

    default:
      return state;
  }
}

export const getSubmitting = (state: State) => state.submitting;
export const getSuccess = (state: State) => state.success;
export const getError = (state: State) => state.error;
