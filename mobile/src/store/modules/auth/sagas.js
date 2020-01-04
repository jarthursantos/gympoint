import {Alert} from 'react-native';

import {all, takeLatest, call, put} from 'redux-saga/effects';

import api from '~/services/api';

import {signInSuccess, signInFailure} from './actions';
import types from './types';

export function* signIn({payload}) {
  try {
    const {code} = payload;

    const response = yield call(api.post, 'connections', {code});

    const {id, name} = response.data;

    yield put(signInSuccess(id, name));
  } catch (err) {
    Alert.alert(
      'Falha na autenticação',
      'Houve um erro no login, verifique seus dados',
    );
    yield put(signInFailure());
  }
}

export default all([takeLatest(types.SIGN_IN_REQUEST, signIn)]);
