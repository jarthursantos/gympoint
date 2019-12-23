import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import RegistrationForm from '~/components/RegistrationForm';
import api from '~/services/api';
import history from '~/services/history';
import { navigate } from '~/store/modules/navigation/actions';

export default function RegistrationRegister() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(navigate('registrations'));
  }, [dispatch]);

  function handleSubmit(data) {
    setIsLoading(true);

    api
      .post('/registrations', data)
      .then(() => {
        history.push('/registrations');
      })
      .catch(err => {
        toast.error(err.response.data.error);
        setIsLoading(false);
      });
  }

  return (
    <RegistrationForm
      title="Cadastro de matrícula"
      onSubmit={handleSubmit}
      isLoading={isLoading}
    />
  );
}
