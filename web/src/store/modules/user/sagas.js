import { toast } from 'react-toastify';

import { all, call, put, takeLatest } from 'redux-saga/effects';

import api from '~/services/api';

import { updateProfileSuccess, updateProfileFailure } from './actions';

export function* updateProfile({ payload }) {
  try {
    const { name, email, avatar_id, ...rest } = payload.data;

    const profile = {
      name,
      email,
      avatar_id,
      ...(rest.old_password ? rest : {}),
    };

    const response = yield call(api.put, '/users', profile);

    toast.success('Perfil atualizado com sucesso');

    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    if (err.response) {
      toast.error(err.response.data.error);
    } else {
      toast.error(
        'Ocorreu um erro ao tentar se comunicar com o servidor, favor tentar novamente mais tarde'
      );
    }

    yield put(updateProfileFailure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
