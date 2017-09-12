import * as ChangePassword from '../actions/change-password';

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

export function reducer(state = initialState, action: ChangePassword.Actions): State {
  switch (action.type) {
    case ChangePassword.CHANGE_PASSWORD:
      return {
        ...state,
        success: false,
        error: null,
        submitting: true
      };

    case ChangePassword.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        submitting: false,
        success: true
      };

    case ChangePassword.CHANGE_PASSWORD_FAILURE:
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
