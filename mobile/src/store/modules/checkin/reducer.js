import produce from 'immer';

import types from './types';

const INITIAL_STATE = {
  checkins: [],
  loading: false,
  refreshing: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case types.ADD_CHECKIN_SUCCESS: {
        const {id, created_at} = action.payload;

        draft.checkins.splice(0, 0, {id, created_at});
        draft.loading = false;
        break;
      }
      case types.ADD_CHECKIN_REQUEST: {
        draft.loading = true;
        break;
      }
      case types.ADD_CHECKIN_FAILURE: {
        draft.loading = false;
        break;
      }

      case types.GET_CHECKINS_SUCCESS: {
        draft.checkins = action.payload.checkins;
        draft.refreshing = false;
        break;
      }
      case types.GET_CHECKINS_REQUEST: {
        draft.refreshing = true;
        break;
      }
      case types.GET_CHECKINS_FAILURE: {
        draft.refreshing = false;
        break;
      }
      default:
    }
  });
}
