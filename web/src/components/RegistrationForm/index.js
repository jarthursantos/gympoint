import React, { useState, useEffect, useMemo } from 'react';

import { format, addMonths } from 'date-fns';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import BackButton from '~/components/BackButton';
import DatePicker from '~/components/DatePicker';
import LabeledField from '~/components/LabeledField';
import SaveButton from '~/components/SaveButton';
import Select from '~/components/Select';
import TopBar from '~/components/TopBar';
import api from '~/services/api';
import { formatPrice } from '~/util/format';

import { Wrapper, Container } from './styles';

export default function RegistrationForm({
  initialData,
  title,
  isLoading,
  ...rest
}) {
  const [students, setStudents] = useState([]);
  const [plans, setPlans] = useState([]);
  const [startDate, setStartDate] = useState();

  const [selectedStudent, setSelectedStudent] = useState(null);
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
    if (!initialData) return;

    setStartDate(initialData.start_date);
    setSelectedStudent(initialData.student);
    setSelectedPlan(initialData.plan);
  }, [initialData]);

  useEffect(() => {
    (async () => {
      const response = await api.get('/students');

      setStudents(response.data.map(({ id, name }) => ({ id, title: name })));
    })();

    (async () => {
      const response = await api.get('/plans');

      setPlans(response.data);
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
    <Wrapper
      initialData={initialData}
      autoComplete="off"
      schema={schema}
      {...rest}
      onSubmit={data => console.tron.log(data)}
    >
      <TopBar title={title}>
        <BackButton to="/registrations" />
        <SaveButton isLoading={isLoading} />
      </TopBar>

      <Container>
        <LabeledField htmlFor="student">
          <strong>Aluno</strong>
          <Select
            name="student_id"
            id="student"
            options={students}
            placeholder="Selecionar aluno"
            value={selectedStudent}
            onChange={setSelectedStudent}
          />
        </LabeledField>

        <div className="horizontal">
          <LabeledField htmlFor="plan">
            <strong>Plano</strong>
            <Select
              name="plan_id"
              id="plan"
              options={plans}
              placeholder="Selecionar plano"
              value={selectedPlan}
              onChange={value => {
                console.tron.log(value);
                setSelectedPlan(value);
              }}
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

RegistrationForm.propTypes = {
  title: PropTypes.string.isRequired,
  initialData: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    student: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
    plan: PropTypes.shape({
      id: PropTypes.number,
    }),
    start_date: PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.string,
    ]),
    height: PropTypes.number,
    weight: PropTypes.number,
  }),
  isLoading: PropTypes.bool,
};

RegistrationForm.defaultProps = {
  isLoading: false,
  initialData: {},
};
