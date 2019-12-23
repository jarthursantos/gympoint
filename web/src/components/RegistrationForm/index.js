import React, { useState, useEffect, useMemo } from 'react';
import * as Yup from 'yup';
import { format, addMonths } from 'date-fns';

import api from '~/services/api';
import { formatPrice } from '~/util/format';

import TopBar from '~/components/TopBar';
import LabeledField from '~/components/LabeledField';
import BackButton from '~/components/BackButton';
import DatePicker from '~/components/DatePicker';
import ReactSelect from '~/components/ReactSelect';
import SaveButton from '~/components/SaveButton';
import { Wrapper, Container } from './styles';

export default function RegistrationForm({
  initialData,
  title,
  isLoading,
  ...rest
}) {
  const [students, setStudents] = useState([]);
  const [plans, setPlans] = useState([]);
  const [startDate, setStartDate] = useState(new Date());

  const [selectedPlan, setSelectedPlan] = useState(null);

  const endDate = useMemo(() => {
    if (!selectedPlan || !startDate) return null;
    return format(addMonths(startDate, selectedPlan.duration), 'dd/MM/yyyy');
  }, [selectedPlan, startDate]);

  const totalValue = useMemo(() => {
    if (!selectedPlan) return null;
    return formatPrice(selectedPlan.duration * selectedPlan.price);
  }, [selectedPlan]);

  useEffect(() => {
    (async () => {
      const response = await api.get('/students');

      setStudents(response.data.map(({ id, name: title }) => ({ id, title })));
    })();

    (async () => {
      const response = await api.get('/plans');

      setPlans(
        response.data.map(({ id, title, duration, price }) => ({
          id,
          title,
          duration,
          price,
        }))
      );
    })();
  }, []);

  const schema = Yup.object().shape({
    student_id: Yup.number()
      .integer()
      .typeError('É necessário selecionar um aluno')
      .required('É necessário selecionar um aluno'),
    plan_id: Yup.number()
      .integer()
      .typeError('É necessário selecionar um plano')
      .required('É necessário selecionar um plano'),
    start_date: Yup.date('A data de nascimento é inválida').required(
      'A data de nascimento é obrigatória'
    ),
  });

  return (
    <Wrapper autoComplete="off" schema={schema} {...rest}>
      <TopBar title={title}>
        <BackButton to="/registrations" />
        <SaveButton isLoading={isLoading} />
      </TopBar>

      <Container>
        <LabeledField htmlFor="student">
          <strong>Aluno</strong>
          <ReactSelect
            name="student_id"
            id="student"
            options={students}
            placeholder="Selecionar aluno"
          />
        </LabeledField>

        <div className="horizontal">
          <LabeledField htmlFor="plan">
            <strong>Plano</strong>
            <ReactSelect
              name="plan_id"
              id="plan"
              options={plans}
              placeholder="Selecionar plano"
              value={selectedPlan}
              onChange={setSelectedPlan}
            />
          </LabeledField>
          <LabeledField htmlFor="start_date">
            <strong>Data de Início</strong>
            <DatePicker
              style={{ width: '50px' }}
              name="start_date"
              id="start_date"
              selected={startDate}
              onChange={setStartDate}
            />
          </LabeledField>
          <LabeledField htmlFor="end_date">
            <strong>Data de Término</strong>
            <input value={endDate || ''} type="text" id="end_date" disabled />
          </LabeledField>
          <LabeledField htmlFor="amount">
            <strong>Valor Final</strong>
            <input value={totalValue || ''} type="text" id="amount" disabled />
          </LabeledField>
        </div>
      </Container>
    </Wrapper>
  );
}
