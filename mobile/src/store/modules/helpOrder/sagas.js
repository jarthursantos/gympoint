import {Alert} from 'react-native';

import {all, takeLatest, call, put, select} from 'redux-saga/effects';

import api from '~/services/api';

import authTypes from '../auth/types';
import {
  addHelpOrderSuccess,
  addHelpOrderFailure,
  getHelpOrdersSuccess,
  getHelpOrdersFailure,
} from './actions';
import types from './types';

export function* addHelpOrder({payload}) {
  const {question} = payload;
  // try {
  const student_id = yield select(state => state.auth.student.id);

  const response = yield call(api.post, `students/${student_id}/help-orders`, {
    question,
  });

  yield put(addHelpOrderSuccess(response.data));
  // } catch (err) {
  //   Alert.alert(
  //     'Ocorreu um erro',
  //     'Não foi possível realizar seu pedido de ajuda',
  //   );
  //   yield put(addHelpOrderFailure());
  // }
}

export function* getHelpOrders() {
  try {
    const signed = yield select(state => state.auth.signed);

    if (signed) {
      const student_id = yield select(state => state.auth.student.id);

      const response = yield call(
        api.get,
        `students/${student_id}/help-orders`,
      );

      yield put(getHelpOrdersSuccess(response.data));
    }
  } catch (err) {
    Alert.alert(
      'Ocorreu um erro',
      'Não foi possível obter os pedidos de ajuda',
    );
    yield put(getHelpOrdersFailure());
  }
}

export default all([
  takeLatest(types.ADD_HELP_ORDER_REQUEST, addHelpOrder),
  takeLatest(types.GET_HELP_ORDERS_REQUEST, getHelpOrders),
  takeLatest(authTypes.SIGN_IN_SUCCESS, getHelpOrders),
  takeLatest('persist/REHYDRATE', getHelpOrders),
]);
