import React, { useState, useEffect, useMemo } from 'react';

import { Input } from '@rocketseat/unform';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import BackButton from '~/components/BackButton';
import LabeledField from '~/components/LabeledField';
import SaveButton from '~/components/SaveButton';
import TopBar from '~/components/TopBar';
import { formatPrice } from '~/util/format';

import { Wrapper, Container } from './styles';

export default function PlanForm({ title, initialData, isLoading, ...rest }) {
  const [price, setPrice] = useState(null);
  const [duration, setDuration] = useState(null);

  const amount = useMemo(() => {
    return formatPrice((price || 0) * (duration || 0));
  }, [duration, price]);

  useEffect(() => {
    if (initialData) {
      setPrice(initialData.price);
      setDuration(initialData.duration);
    }
  }, [initialData]);

  const schema = Yup.object().shape({
    title: Yup.string()
      .max(255, 'O título deve possuir no máximo 255 caracteres')
      .required('O título é obrigatório'),
    duration: Yup.number('Valor informado é inválido')
      .integer('A duração precisa ser um valor inteiro')
      .min(1, 'A duração precisa ser maior que 0')
      .required('A duração é obrigatória')
      .typeError('A duração é obrigatória'),
    price: Yup.number('Valor informado é inválido')
      .min(1, 'A duração precisa ser maior que 0')
      .required('O preço mensal é obrigatório')
      .typeError('O preço mensal é obrigatório'),
  });

  return (
    <Wrapper
      initialData={initialData}
      autoComplete="off"
      schema={schema}
      {...rest}
    >
      <TopBar title={title}>
        <BackButton to="/plans" />
        <SaveButton isLoading={isLoading} />
      </TopBar>

      <Container>
        <LabeledField htmlFor="title">
          <strong>Título do Plano</strong>
          <Input name="title" type="text" id="title" />
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
            />
          </LabeledField>
          <LabeledField htmlFor="price">
            <strong>Preço Mensal</strong>
            <Input
              name="price"
              type="number"
              id="price"
              value={price || ''}
              onChange={e => setPrice(e.target.value)}
            />
          </LabeledField>
          <LabeledField htmlFor="amount">
            <strong>Preço Total</strong>
            <input disabled type="text" id="amount" value={amount} />
          </LabeledField>
        </div>
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
};

PlanForm.defaultProps = {
  isLoading: false,
  initialData: {},
};
