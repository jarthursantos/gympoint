import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { parseISO } from 'date-fns';

import RegistrationForm from '~/components/RegistrationForm';
import api from '~/services/api';
import history from '~/services/history';
import { navigate } from '~/store/modules/navigation/actions';

export default function RegistrationEditor() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [registration, setRegistration] = useState({});

  useEffect(() => {
    (async () => {
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
    })();
  }, [id]);

  useEffect(() => {
    dispatch(navigate('registrations'));
  }, [dispatch]);

  function handleSubmit({ start_date, plan: plan_id, student: student_id }) {
    setIsLoading(true);

    api
      .put(`/registrations/${id}`, { start_date, student_id, plan_id })
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
      title="Edição de matrícula"
      onSubmit={handleSubmit}
      isLoading={isLoading}
      initialData={registration}
    />
  );
}
