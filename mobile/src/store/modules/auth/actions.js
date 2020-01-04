import types from './types';

export function signInRequest(code) {
  return {
    type: types.SIGN_IN_REQUEST,
    payload: {code},
  };
}

export function signInSuccess(id, name) {
  return {
    type: types.SIGN_IN_SUCCESS,
    payload: {id, name},
  };
}

export function signInFailure() {
  return {
    type: types.SIGN_IN_FAILURE,
  };
}
