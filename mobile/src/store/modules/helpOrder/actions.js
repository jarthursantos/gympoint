import types from './types';

export function addHelpOrderRequest(question) {
  return {
    type: types.ADD_HELP_ORDER_REQUEST,
    payload: {question},
  };
}

export function addHelpOrderSuccess(helpOrder) {
  return {
    type: types.ADD_HELP_ORDER_SUCCESS,
    payload: {helpOrder},
  };
}

export function addHelpOrderFailure() {
  return {
    type: types.ADD_HELP_ORDER_FAILURE,
  };
}

export function getHelpOrdersRequest() {
  return {
    type: types.GET_HELP_ORDERS_REQUEST,
  };
}

export function getHelpOrdersSuccess(helpOrders) {
  return {
    type: types.GET_HELP_ORDERS_SUCCESS,
    payload: {helpOrders},
  };
}

export function getHelpOrdersFailure() {
  return {
    type: types.GET_HELP_ORDERS_FAILURE,
  };
}
