import React, { useState, useEffect, useMemo } from 'react';

import { format, addMonths, parseISO, isEqual } from 'date-fns';
import PropTypes from 'prop-types';

import BackButton from '~/components/BackButton';
import CurrencyInput from '~/components/CurrencyInput';
import DatePicker from '~/components/DatePicker';
import ErrorState from '~/components/ErrorState';
import LabeledField from '~/components/LabeledField';
import SaveButton from '~/components/SaveButton';
import TopBar from '~/components/TopBar';
import { formatPriceWithoutSymbol } from '~/util/format';

import PlanPicker from './PlanPicker';
import schema from './schema';
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

  const needChangeCalcBase = useMemo(() => {
    const {
      start_date: current_start_date,
      plan: current_plan,
      active,
    } = initialData;

    if (selectedPlan && startDate) {
      const plan_changed = current_plan && selectedPlan.id !== current_plan.id;
      const start_date_changed = !isEqual(current_start_date, startDate);

      if (!current_plan || plan_changed || start_date_changed || !active) {
        return true;
      }
    }

    return false;
  }, [initialData, selectedPlan, startDate]);

  const endDate = useMemo(() => {
    setShowsObservation(false);
    const { end_date: current_end_date } = initialData;

    if (needChangeCalcBase) {
      return format(addMonths(startDate, selectedPlan.duration), 'dd/MM/yyyy');
    }

    if (!current_end_date) return null;
    setShowsObservation(true);

    return format(parseISO(current_end_date), 'dd/MM/yyyy');
  }, [needChangeCalcBase, initialData, selectedPlan, startDate]);

  const amountValue = useMemo(() => {
    setShowsObservation(false);
    const { price } = initialData;

    if (needChangeCalcBase) {
      return formatPriceWithoutSymbol(
        selectedPlan.duration * selectedPlan.price
      );
    }

    if (!price) return null;
    setShowsObservation(true);

    return formatPriceWithoutSymbol(price);
  }, [needChangeCalcBase, initialData, selectedPlan]);

  useEffect(() => {
    if (!initialData) return;

    setStartDate(initialData.start_date);
  }, [initialData]);

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
                  disabled={locked}
                />
              </LabeledField>

              <LabeledField htmlFor="end_date">
                <strong>Data de Término{showsObservation && ' *'}</strong>
                <input
                  value={endDate || ''}
                  type="text"
                  id="end_date"
                  disabled
                />
              </LabeledField>

              <LabeledField htmlFor="amount">
                <strong>Valor Final{showsObservation && ' *'}</strong>
                <CurrencyInput>
                  <input
                    value={amountValue || ''}
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
    active: PropTypes.bool,
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
