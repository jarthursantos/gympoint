import React, { useState, useEffect, useMemo } from 'react';

import { format, addMonths } from 'date-fns';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import BackButton from '~/components/BackButton';
import DatePicker from '~/components/DatePicker';
import LabeledField from '~/components/LabeledField';
import SaveButton from '~/components/SaveButton';
import TopBar from '~/components/TopBar';
import { formatPrice } from '~/util/format';

import PlanPicker from './PlanPicker';
import StudentPicker from './StudentPicker';
import { Wrapper, Container } from './styles';

export default function RegistrationForm({
  title,
  isLoading,
  initialData,
  ...rest
}) {
  const [startDate, setStartDate] = useState();

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
    setSelectedPlan(initialData.plan);
  }, [initialData]);

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
    <Wrapper
      initialData={initialData}
      autoComplete="off"
      schema={schema}
      {...rest}
    >
      <TopBar title={title}>
        <BackButton to="/registrations" />
        <SaveButton isLoading={isLoading} />
      </TopBar>

      <Container>
        <LabeledField htmlFor="student">
          <strong>Aluno</strong>
          <StudentPicker id="student" name="student" />
        </LabeledField>

        <div className="horizontal">
          <LabeledField htmlFor="plan">
            <strong>Plano</strong>
            <PlanPicker id="plan" name="plan" onPlanChange={setSelectedPlan} />
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
