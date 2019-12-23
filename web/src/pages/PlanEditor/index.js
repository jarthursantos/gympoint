import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';
import { navigate } from '~/store/modules/navigation/actions';

import PlanForm from '~/components/PlanForm';

export default function PlanEditor() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const [plan, setPlan] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await api.get(`/plans/${id}`);

      setPlan(response.data);
    })();
  }, [id]);

  useEffect(() => {
    dispatch(navigate('plans'));
  }, [dispatch]);

  async function handleSubmit(data) {
    setIsLoading(true);

    api
      .put(`/plans/${id}`, data)
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
      title="Edição de plano"
      initialData={plan}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    />
  );
}
