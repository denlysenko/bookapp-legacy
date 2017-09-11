import * as fromProfile from '../actions/profile';

export interface State {
  submitting: boolean;
  error: string | null;
  success: boolean;
}

export const initialState: State = {
  submitting: false,
  error: null,
  success: false
};

export function reducer(state = initialState, action: fromProfile.Actions) {
  switch (action.type) {
    case fromProfile.SAVE_PROFILE:
      return {
        ...state,
        submitting: true
      };

    case fromProfile.SAVE_PROFILE_SUCCESS:
      return {
        ...state,
        submitting: false,
        success: true
      };

    case fromProfile.SAVE_PROFILE_FAILURE:
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
