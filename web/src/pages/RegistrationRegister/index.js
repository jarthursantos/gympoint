import React, { useState } from 'react';
import { toast } from 'react-toastify';

import RegistrationForm from '~/components/RegistrationForm';
import api from '~/services/api';
import history from '~/services/history';

export default function RegistrationRegister() {
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit({ start_date, plan: plan_id, student: student_id }) {
    setIsLoading(true);

    api
      .post('/registrations', { start_date, student_id, plan_id })
      .then(() => {
        history.push('/registrations');
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
    <RegistrationForm
      title="Cadastro de matrícula"
      onSubmit={handleSubmit}
      isLoading={isLoading}
      initialData={{ start_date: new Date() }}
    />
  );
}
