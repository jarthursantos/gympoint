import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { parseISO } from 'date-fns';

import RegistrationForm from '~/components/RegistrationForm';
import api from '~/services/api';
import history from '~/services/history';

export default function RegistrationEditor() {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [registration, setRegistration] = useState({});
  const [loadingError, setLoadingError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get(`/registrations/${id}`);

        const { student } = response.data;

        setRegistration({
          ...response.data,
          start_date: parseISO(response.data.start_date),
          student: {
            ...student,
            title: student.name,
          },
        });
      } catch (err) {
        toast.error(
          'Ocorreu um erro ao tentar se comunicar com o servidor, favor tentar novamente mais tarde'
        );

        setIsLoading(false);
        setLoadingError(true);
      }
    })();
  }, [id, isLoading]);

  function handleSubmit({ start_date, plan: plan_id, student: student_id }) {
    setIsLoading(true);

    api
      .put(`/registrations/${id}`, { start_date, student_id, plan_id })
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
      title="Edição de matrícula"
      initialData={registration}
      onSubmit={handleSubmit}
      saving={isLoading}
      error={loadingError}
      locked={!registration.id}
      isLoading={!registration.id}
    />
  );
}
