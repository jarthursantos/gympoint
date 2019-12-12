import produce from 'immer';

import types from './types';

const INITIAL_STATE = {
  activeTab: null,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case types.NAVIGATE: {
        draft.activeTab = action.payload.activeTab;
        break;
      }
      default:
    }
  });
}
