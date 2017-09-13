import * as RestorePassword from '../actions/restore-password';

export interface State {
  submitting: boolean;
  success: boolean;
  error: string | null;
}

export const initialState: State = {
  submitting: false,
  success: false,
  error: null
};

export function reducer(state = initialState, action: RestorePassword.Actions): State {
  switch (action.type) {
    case RestorePassword.RESET_PASSWORD:
      return {
        ...state,
        submitting: true,
        success: false,
        error: null
      };

    case RestorePassword.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        submitting: false,
        success: true
      };

    case RestorePassword.RESET_PASSWORD_FAILURE:
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
export const getError = (state: State) => state.error;
