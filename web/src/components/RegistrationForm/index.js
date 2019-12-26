import React, { useState, useEffect, useMemo } from 'react';

import { format, addMonths, parseISO } from 'date-fns';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import BackButton from '~/components/BackButton';
import CurrencyInput from '~/components/CurrencyInput';
import DatePicker from '~/components/DatePicker';
import ErrorState from '~/components/ErrorState';
import LabeledField from '~/components/LabeledField';
import SaveButton from '~/components/SaveButton';
import TopBar from '~/components/TopBar';
import { formatPrice } from '~/util/format';

import PlanPicker from './PlanPicker';
import StudentPicker from './StudentPicker';
import { Wrapper, Container, Observation } from './styles';

export default function RegistrationForm({
  title,
  isLoading,
  saving,
  error,
  locked,
  initialData,
  ...rest
}) {
  const [startDate, setStartDate] = useState();
  const [showsObservation, setShowsObservation] = useState(false);

  const [selectedPlan, setSelectedPlan] = useState(null);

  const endDate = useMemo(() => {
    setShowsObservation(false);
    const { end_date, plan: currentPlan } = initialData;

    if (selectedPlan) {
      if (!currentPlan || (currentPlan && selectedPlan.id !== currentPlan.id)) {
        return format(
          addMonths(startDate, selectedPlan.duration),
          'dd/MM/yyyy'
        );
      }

      setShowsObservation(true);
      return format(parseISO(end_date), 'dd/MM/yyyy');
    }

    if (!end_date) return null;
    setShowsObservation(true);
    return format(parseISO(end_date), 'dd/MM/yyyy');
  }, [initialData, selectedPlan, startDate]);

  const totalValue = useMemo(() => {
    setShowsObservation(false);
    const { price, plan: currentPlan } = initialData;

    if (selectedPlan) {
      if (!currentPlan || (currentPlan && selectedPlan.id !== currentPlan.id)) {
        return formatPrice(selectedPlan.duration * selectedPlan.price)
          .replace('R$', '')
          .trim();
      }

      setShowsObservation(true);
      return formatPrice(price)
        .replace('R$', '')
        .trim();
    }

    if (!price) return null;
    setShowsObservation(true);
    return formatPrice(price)
      .replace('R$', '')
      .trim();
  }, [initialData, selectedPlan]);

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
      <TopBar isLoading={isLoading} title={title}>
        <BackButton to="/registrations" />
        <SaveButton isLoading={saving} disabled={locked} />
      </TopBar>

      <Container>
        {error ? (
          <ErrorState />
        ) : (
          <>
            <LabeledField htmlFor="student">
              <strong>Aluno</strong>
              <StudentPicker id="student" name="student" />
            </LabeledField>
            <div className="horizontal">
              <LabeledField htmlFor="plan">
                <strong>Plano</strong>
                <PlanPicker
                  id="plan"
                  name="plan"
                  onPlanChange={setSelectedPlan}
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
                  placeholderText="Selecione o dia do inicio"
                  disabled={locked}
                />
              </LabeledField>

              <LabeledField htmlFor="end_date">
                <strong>{showsObservation && '* '}Data de Término</strong>
                <input
                  value={endDate || ''}
                  type="text"
                  id="end_date"
                  disabled
                />
              </LabeledField>

              <LabeledField htmlFor="amount">
                <strong>{showsObservation && '* '}Valor Final</strong>
                <CurrencyInput>
                  <input
                    value={totalValue || ''}
                    type="text"
                    id="amount"
                    disabled
                  />
                </CurrencyInput>
              </LabeledField>
            </div>
            {showsObservation && (
              <Observation>
                * A politíca dos cálculos levam em conta os valores cadastrados
                no plano na data desta matrícula, caso a mesma não tenha
                expirado.
              </Observation>
            )}
          </>
        )}
      </Container>
    </Wrapper>
  );
}

RegistrationForm.propTypes = {
  title: PropTypes.string.isRequired,
  initialData: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    price: PropTypes.number,
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
    end_date: PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.string,
    ]),
    height: PropTypes.number,
    weight: PropTypes.number,
  }),
  saving: PropTypes.bool,
  locked: PropTypes.bool,
  error: PropTypes.bool,
  isLoading: PropTypes.bool,
};

RegistrationForm.defaultProps = {
  saving: false,
  locked: false,
  error: false,
  isLoading: false,
  initialData: {},
};

// TODO: verify if start_date is after of end_date, to apply new politics
