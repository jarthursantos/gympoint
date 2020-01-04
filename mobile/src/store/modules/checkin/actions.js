import types from './types';

export function addCheckinRequest() {
  return {
    type: types.ADD_CHECKIN_REQUEST,
  };
}

export function addCheckinSuccess(id, created_at) {
  return {
    type: types.ADD_CHECKIN_SUCCESS,
    payload: {id, created_at},
  };
}

export function addCheckinFailure() {
  return {
    type: types.ADD_CHECKIN_FAILURE,
  };
}

export function getCheckinsRequest() {
  return {
    type: types.GET_CHECKINS_REQUEST,
  };
}

export function getCheckinsSuccess(checkins) {
  return {
    type: types.GET_CHECKINS_SUCCESS,
    payload: {checkins},
  };
}

export function getCheckinsFailure() {
  return {
    type: types.GET_CHECKINS_FAILURE,
  };
}
