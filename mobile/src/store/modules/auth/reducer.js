import produce from 'immer';

import types from './types';

const INITIAL_STATE = {
  student: null,
  signed: false,
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case types.SIGN_IN_SUCCESS: {
        const {id, name} = action.payload;

        draft.student = {id, name};
        draft.signed = true;
        draft.loading = false;
        break;
      }
      case types.SIGN_IN_REQUEST: {
        draft.loading = true;
        break;
      }
      case types.SIGN_IN_FAILURE: {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
