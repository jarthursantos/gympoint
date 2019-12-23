import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import PlanForm from '~/components/PlanForm';
import api from '~/services/api';
import history from '~/services/history';
import { navigate } from '~/store/modules/navigation/actions';

export default function PlanRegister() {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(navigate('plans'));
  }, [dispatch]);

  async function handleSubmit(data) {
    setIsLoading(true);

    api
      .post('/plans', data)
      .then(() => {
        history.push('/plans');
      })
      .catch(err => {
        toast.error(err.response.data.error);
        setIsLoading(false);
      });
  }

  return (
    <PlanForm
      title="Cadastrar plano"
      isLoading={isLoading}
      onSubmit={handleSubmit}
    />
  );
}
