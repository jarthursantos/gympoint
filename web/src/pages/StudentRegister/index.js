import React, { useState } from 'react';
import { toast } from 'react-toastify';

import StudentForm from '~/components/StudentForm';
import api from '~/services/api';
import history from '~/services/history';

export default function StudentRegister() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(data) {
    setIsLoading(true);

    api
      .post('/students', data)
      .then(() => {
        history.push('/students');
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
    <StudentForm
      title="Cadastrar aluno"
      onSubmit={handleSubmit}
      isLoading={isLoading}
    />
  );
}
