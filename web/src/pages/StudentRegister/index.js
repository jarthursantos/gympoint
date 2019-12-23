import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { navigate } from '~/store/modules/navigation/actions';

import api from '~/services/api';
import history from '~/services/history';
import StudentForm from '~/components/StudentForm';
import { Wrapper } from './styles';

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
    <Wrapper>
      <StudentForm
        title="Cadastrar aluno"
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </Wrapper>
  );
}
