import React, { useState, useEffect } from 'react';
import { parseISO } from 'date-fns';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { navigate } from '~/store/modules/navigation/actions';

import api from '~/services/api';
import history from '~/services/history';
import StudentForm from '~/components/StudentForm';

export default function StudentEditor() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [student, setStudent] = useState({});

  useEffect(() => {
    (async () => {
      const response = await api.get(`/students/${id}`);

      setStudent({
        ...response.data,
        birthdate: parseISO(response.data.birthdate),
      });

      console.tron.log(response.data);
    })();
  }, [id]);

  useEffect(() => {
    dispatch(navigate('students'));
  }, [dispatch]);

  async function handleSubmit(data) {
    setIsLoading(true);

    api
      .put(`/students/${id}/`, data)
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
      title="Edição de aluno"
      onSubmit={handleSubmit}
      isLoading={isLoading}
      initialData={student}
    />
  );
}
