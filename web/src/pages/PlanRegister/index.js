import React, { useState } from 'react';
import { toast } from 'react-toastify';

import PlanForm from '~/components/PlanForm';
import api from '~/services/api';
import history from '~/services/history';

export default function PlanRegister() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(data) {
    setIsLoading(true);

    api
      .post('/plans', data)
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
      title="Cadastrar plano"
      saving={isLoading}
      onSubmit={handleSubmit}
    />
  );
}
