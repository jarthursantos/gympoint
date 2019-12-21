import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';

import { navigate } from '~/store/modules/navigation/actions';

import api from '~/services/api';
import history from '~/services/history';
import TopBar from '~/components/TopBar';
import LabeledField from '~/components/LabeledField';
import BackButton from '~/components/BackButton';
import SaveButton from '~/components/SaveButton';
import DatePicker from '~/components/DatePicker';
import { Wrapper, Container } from './styles';

export default function StudentRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(navigate('students'));
  }, [dispatch]);

  async function handleSubmit(data) {
    setIsLoading(true);

    api
      .post('/students', data)
      .then(() => {
        history.push('/students');
      })
      .catch(err => {
        toast.error(err.response.data.error);
        setIsLoading(false);
      });
  }

  const schema = Yup.object().shape({
    name: Yup.string()
      .max(255, 'O nome deve possuir no máximo 255 caracteres')
      .required('O nome é obrigatório'),
    email: Yup.string()
      .email('O email informado é inválido')
      .max(255, 'O email deve possuir no máximo 255 caracteres')
      .required('O email é obrigatório'),
    height: Yup.number('Valor informado é inválido')
      .min(1, 'A altura precisa ser maior que 0')
      .required('A altura é obrigatória')
      .typeError('A altura é obrigatória'),
    weight: Yup.number('Valor informado é inválido')
      .min(1, 'O peso precisa ser maior que 0')
      .required('O peso é obrigatório')
      .typeError('O peso é obrigatório'),
    birthdate: Yup.date('A data de nascimento é inválida').required(
      'A data de nascimento é obrigatória'
    ),
  });

  return (
    <Wrapper>
      <Container autoComplete="off" schema={schema} onSubmit={handleSubmit}>
        <TopBar title="Cadastrar aluno">
          <BackButton to="/students" />
          <SaveButton isLoading={isLoading} />
        </TopBar>

        <div className="fields">
          <LabeledField htmlFor="name">
            <strong>Nome Completo</strong>
            <Input name="name" type="text" id="name" />
          </LabeledField>

          <div className="horizontal">
            <LabeledField htmlFor="email">
              <strong>Endereço de E-mail</strong>
              <Input name="email" type="text" id="email" />
            </LabeledField>
          </div>

          <div className="fields horizontal">
            <LabeledField htmlFor="birthdate">
              <strong>Data de Nascimento</strong>
              <DatePicker
                style={{ width: '50px' }}
                name="birthdate"
                id="birthdate"
              />
            </LabeledField>
            <LabeledField htmlFor="height">
              <strong>
                Peso <small>(em kg)</small>
              </strong>
              <Input name="height" type="number" step={0.01} id="height" />
            </LabeledField>
            <LabeledField htmlFor="weight">
              <strong>Altura</strong>
              <Input name="weight" type="number" step={0.01} id="weight" />
            </LabeledField>
          </div>
        </div>
      </Container>
    </Wrapper>
  );
}
