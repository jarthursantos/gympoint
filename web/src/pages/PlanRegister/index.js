import React, { useState, useEffect, useMemo } from 'react';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';
import { navigate } from '~/store/modules/navigation/actions';
import { formatPrice } from '~/util/format';

import TopBar from '~/components/TopBar';
import LabeledField from '~/components/LabeledField';
import BackButton from '~/components/BackButton';
import SaveButton from '~/components/SaveButton';
import { Wrapper, Container } from './styles';

export default function PlanRegister() {
  const dispatch = useDispatch();

  const [price, setPrice] = useState(null);
  const [duration, setDuration] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const amount = useMemo(() => {
    return formatPrice(price * duration);
  }, [duration, price]);

  useEffect(() => {
    dispatch(navigate('plans'));
  }, [dispatch]);

  async function handleSubmit(data) {
    setIsLoading(true);

    api
      .post('/plans', data)
      .then(() => {
        history.push('/plans');
      })
      .catch(err => {
        toast.error(err.response.data.error);
        setIsLoading(false);
      });
  }

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
    <Wrapper>
      <Container schema={schema} onSubmit={handleSubmit}>
        <TopBar title="Cadastrar plano">
          <BackButton to="/plans" />
          <SaveButton isLoading={isLoading} />
        </TopBar>

        <div>
          <LabeledField htmlFor="title">
            <strong>Título do Plano</strong>
            <Input name="title" type="text" id="title" />
          </LabeledField>
          <div>
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
        </div>
      </Container>
    </Wrapper>
  );
}
