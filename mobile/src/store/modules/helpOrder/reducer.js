import produce from 'immer';

import types from './types';

const INITIAL_STATE = {
  helpOrders: [],
  loading: false,
  refreshing: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case types.ADD_HELP_ORDER_SUCCESS: {
        draft.helpOrders.splice(0, 0, action.payload.helpOrder);
        draft.loading = false;
        break;
      }
      case types.ADD_HELP_ORDER_REQUEST: {
        draft.loading = true;
        break;
      }
      case types.ADD_HELP_ORDER_FAILURE: {
        draft.loading = false;
        break;
      }

      case types.GET_HELP_ORDERS_SUCCESS: {
        draft.helpOrders = action.payload.helpOrders;
        draft.refreshing = false;
        break;
      }
      case types.GET_HELP_ORDERS_REQUEST: {
        draft.refreshing = true;
        break;
      }
      case types.GET_HELP_ORDERS_FAILURE: {
        draft.refreshing = false;
        break;
      }
      default:
    }
  });
}
