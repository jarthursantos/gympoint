import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

import api from '~/services/api';
import { navigate } from '~/store/modules/navigation/actions';

import TopBar from '~/components/TopBar';
import LabeledField from '~/components/LabeledField';
import BackButton from '~/components/BackButton';
import DatePicker from '~/components/DatePicker';
import SaveButton from '~/components/SaveButton';
import ReactSelect from '~/components/ReactSelect';
import { Wrapper, Container } from './styles';

export default function RegistrationRegister() {
  const dispatch = useDispatch();
  const [students, setStudents] = useState([]);
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    dispatch(navigate('registrations'));
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      const response = await api.get('/students');

      setStudents(response.data.map(({ id, name: title }) => ({ id, title })));
    })();

    (async () => {
      const response = await api.get('/plans');

      setPlans(response.data.map(({ id, title }) => ({ id, title })));
    })();
  }, []);

  function handleSubmit(data) {
    console.tron.log(data);
  }

  const schema = Yup.object().shape({
    student: Yup.number()
      .integer()
      .typeError('É necessário selecionar um aluno')
      .required('É necessário selecionar um aluno'),
    plan: Yup.number()
      .integer()
      .typeError('É necessário selecionar um plano')
      .required('É necessário selecionar um plano'),
    start_date: Yup.date('A data de nascimento é inválida').required(
      'A data de nascimento é obrigatória'
    ),
  });

  return (
    <Wrapper>
      <Container autoComplete="off" schema={schema} onSubmit={handleSubmit}>
        <TopBar title="Cadastra de matrícula">
          <BackButton to="/registrations" />
          <SaveButton />
        </TopBar>

        <div className="fields">
          <LabeledField htmlFor="student">
            <strong>Aluno</strong>
            <ReactSelect
              name="student"
              id="student"
              options={students}
              placeholder="Selecionar aluno"
            />
          </LabeledField>

          <div className="fields horizontal">
            <LabeledField htmlFor="plan">
              <strong>Plano</strong>
              <ReactSelect
                name="plan"
                id="plan"
                options={plans}
                placeholder="Selecionar plano"
              />
            </LabeledField>
            <LabeledField htmlFor="start_date">
              <strong>Data de Início</strong>
              <DatePicker
                style={{ width: '50px' }}
                name="start_date"
                id="start_date"
              />
            </LabeledField>
            <LabeledField htmlFor="end_date">
              <strong>Data de Término</strong>
              <input type="number" id="end_date" disabled />
            </LabeledField>
            <LabeledField htmlFor="amount">
              <strong>Valor Final</strong>
              <input type="number" id="amount" disabled />
            </LabeledField>
          </div>
        </div>
      </Container>
    </Wrapper>
  );
}

// TODO: loading state
