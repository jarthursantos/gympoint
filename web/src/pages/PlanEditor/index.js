import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import PlanForm from '~/components/PlanForm';
import api from '~/services/api';
import history from '~/services/history';

export default function PlanEditor() {
  const { id } = useParams();

  const [plan, setPlan] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get(`/plans/${id}`);

        setPlan(response.data);
      } catch (err) {
        toast.error(
          'Ocorreu um erro ao tentar se comunicar com o servidor, favor tentar novamente mais tarde'
        );

        isLoading(false);
        setLoadingError(true);
      }
    })();
  }, [id, isLoading]);

  async function handleSubmit(data) {
    setIsLoading(true);

    api
      .put(`/plans/${id}`, data)
      .then(() => {
        history.push('/plans');
      })
      .catch(err => {
        if (err.response) {
          toast.error(err.response.data.error);
        } else {
          toast.error(
            'Ocorreu um erro ao tentar se comunicar com o servidor, favor tentar novamente mais tarde'
          );
        }

        setIsLoading(false);
      });
  }

  return (
    <PlanForm
      title="Edição de plano"
      initialData={plan}
      onSubmit={handleSubmit}
      saving={isLoading}
      error={loadingError}
      locked={!plan.id}
      isLoading={!plan.id}
    />
  );
}
