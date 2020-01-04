import {Alert} from 'react-native';

import {all, takeLatest, call, put, select} from 'redux-saga/effects';

import api from '~/services/api';

import authTypes from '../auth/types';
import {
  addCheckinSuccess,
  addCheckinFailure,
  getCheckinsSuccess,
  getCheckinsFailure,
} from './actions';
import types from './types';

export function* addCheckin() {
  try {
    const student_id = yield select(state => state.auth.student.id);

    const response = yield call(api.post, `students/${student_id}/checkins`);

    const {id, created_at} = response.data;

    yield put(addCheckinSuccess(id, created_at));
  } catch (err) {
    Alert.alert(
      'Ocorreu um erro',
      'Não foi possível realizar o check-in, verifique sua conexão',
    );
    yield put(addCheckinFailure());
  }
}

export function* getCheckins() {
  try {
    const signed = yield select(state => state.auth.signed);

    if (signed) {
      const student_id = yield select(state => state.auth.student.id);

      const response = yield call(api.get, `students/${student_id}/checkins`);

      yield put(getCheckinsSuccess(response.data));
    }
  } catch (err) {
    Alert.alert(
      'Ocorreu um erro',
      'Não foi possível obter os check-ins, verifique sua conexão',
    );
    yield put(getCheckinsFailure());
  }
}

export default all([
  takeLatest(types.ADD_CHECKIN_REQUEST, addCheckin),
  takeLatest(types.GET_CHECKINS_REQUEST, getCheckins),
  takeLatest(authTypes.SIGN_IN_SUCCESS, getCheckins),
  takeLatest('persist/REHYDRATE', getCheckins),
]);
