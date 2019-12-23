import produce from 'immer';

import authTypes from '../auth/types';
import types from './types';

const INITIAL_STATE = {
  profile: null,
  isLoading: false,
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case authTypes.SIGN_IN_SUCCESS: {
        draft.profile = action.payload.user;
        break;
      }
      case types.UPDATE_PROFILE_REQUEST: {
        draft.isLoading = true;
        break;
      }
      case types.UPDATE_PROFILE_SUCCESS: {
        draft.profile = action.payload.profile;
        draft.isLoading = false;
        break;
      }
      case authTypes.SIGN_OUT: {
        draft.profile = null;
        break;
      }
      default:
    }
  });
}
