import React, { useState, useEffect, useMemo } from 'react';

import { Input } from '@rocketseat/unform';
import PropTypes from 'prop-types';

import BackButton from '~/components/BackButton';
import CurrencyInput from '~/components/CurrencyInput';
import ErrorState from '~/components/ErrorState';
import LabeledField from '~/components/LabeledField';
import SaveButton from '~/components/SaveButton';
import TopBar from '~/components/TopBar';
import { formatPriceWithoutSymbol } from '~/util/format';

import schema from './schema';
import { Wrapper, Container } from './styles';

export default function PlanForm({
  title,
  isLoading,
  saving,
  error,
  locked,
  initialData,
  ...rest
}) {
  const [price, setPrice] = useState(null);
  const [duration, setDuration] = useState(null);

  const amount = useMemo(() => {
    if (!price || !duration) return null;

    return formatPriceWithoutSymbol(price * duration);
  }, [duration, price]);

  useEffect(() => {
    if (initialData) {
      setPrice(parseFloat(initialData.price).toFixed(2));
      setDuration(initialData.duration);
    }
  }, [initialData]);

  return (
    <Wrapper
      initialData={initialData}
      autoComplete="off"
      schema={schema}
      {...rest}
    >
      <TopBar isLoading={isLoading} title={title}>
        <BackButton to="/plans" />
        <SaveButton isLoading={saving} disabled={locked} />
      </TopBar>

      <Container>
        {error ? (
          <ErrorState />
        ) : (
          <>
            <LabeledField htmlFor="title">
              <strong>Título do Plano</strong>
              <Input name="title" type="text" id="title" disabled={locked} />
            </LabeledField>
            <div className="horizontal">
              <LabeledField htmlFor="duration">
                <strong>
                  Duração <small>(em meses)</small>
                </strong>
                <Input
                  name="duration"
                  type="number"
                  id="duration"
                  value={duration || ''}
                  onChange={e => setDuration(e.target.value)}
                  disabled={locked}
                />
              </LabeledField>
              <LabeledField htmlFor="price">
                <strong>Preço Mensal</strong>
                <CurrencyInput>
                  <Input
                    name="price"
                    type="number"
                    id="price"
                    value={price || ''}
                    onChange={e => setPrice(e.target.value)}
                    disabled={locked}
                  />
                </CurrencyInput>
              </LabeledField>
              <LabeledField htmlFor="amount">
                <strong>Preço Total</strong>
                <CurrencyInput>
                  <input disabled type="text" id="amount" value={amount} />
                </CurrencyInput>
              </LabeledField>
            </div>
          </>
        )}
      </Container>
    </Wrapper>
  );
}

PlanForm.propTypes = {
  title: PropTypes.string.isRequired,
  initialData: PropTypes.shape({
    title: PropTypes.string,
    duration: PropTypes.number,
    price: PropTypes.number,
  }),
  isLoading: PropTypes.bool,
  saving: PropTypes.bool,
  error: PropTypes.bool,
  locked: PropTypes.bool,
};

PlanForm.defaultProps = {
  isLoading: false,
  error: false,
  saving: false,
  locked: false,
  initialData: {},
};
