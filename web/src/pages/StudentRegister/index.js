import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import StudentForm from '~/components/StudentForm';
import api from '~/services/api';
import history from '~/services/history';
import { navigate } from '~/store/modules/navigation/actions';

export default function StudentRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(navigate('students'));
  }, [dispatch]);

  async function handleSubmit(data) {
    setIsLoading(true);

    api
      .post('/students', data)
      .then(() => {
        history.push('/students');
      })
      .catch(err => {
        toast.error(err.response.data.error);
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
