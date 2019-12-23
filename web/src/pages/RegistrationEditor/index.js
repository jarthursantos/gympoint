import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import { navigate } from '~/store/modules/navigation/actions';

import api from '~/services/api';
import history from '~/services/history';

import RegistrationForm from '~/components/RegistrationForm';

export default function RegistrationEditor() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(navigate('registrations'));
  }, [dispatch]);

  function handleSubmit(data) {
    setIsLoading(true);

    api
      .put(`/registrations/${id}`, data)
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
      initialData={{ student_id: 1 }}
    />
  );
}
