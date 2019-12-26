import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { parseISO } from 'date-fns';

import StudentForm from '~/components/StudentForm';
import api from '~/services/api';
import history from '~/services/history';

export default function StudentEditor() {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(false);
  const [student, setStudent] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get(`/students/${id}`);

        setStudent({
          ...response.data,
          birthdate: parseISO(response.data.birthdate),
        });
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
      .put(`/students/${id}/`, data)
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
      title="Edição de aluno"
      initialData={student}
      onSubmit={handleSubmit}
      saving={isLoading}
      error={loadingError}
      locked={!student.id}
      isLoading={!student.id}
    />
  );
}
