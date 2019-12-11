import types from './types';

export function signInRequest(email, password) {
  return {
    type: types.SIGN_IN_REQUEST,
    payload: { email, password },
  };
}

export function signInSuccess(token, user) {
  return {
    type: types.SIGN_IN_SUCCESS,
    payload: { token, user },
  };
}

export function signInFailure() {
  return {
    type: types.SIGN_IN_FAILURE,
  };
}

export function signOut() {
  return {
    type: types.SIGN_OUT,
  };
}
