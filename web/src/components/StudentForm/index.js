import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Input } from '@rocketseat/unform';
import PropTypes from 'prop-types';

import DatePicker from '~/components/DatePicker';
import LabeledField from '~/components/LabeledField';
import BackButton from '~/components/BackButton';
import SaveButton from '~/components/SaveButton';
import TopBar from '~/components/TopBar';

import { Wrapper, Container } from './styles';

export default function StudentForm({
  title,
  initialData,
  isLoading,
  ...rest
}) {
  const [birthdate, setBirthdate] = useState(null);

  useEffect(() => {
    if (!initialData) return;

    setBirthdate(initialData.birthdate);
  }, [initialData]);

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
    <Wrapper
      initialData={initialData}
      autoComplete="off"
      schema={schema}
      {...rest}
    >
      <TopBar title={title}>
        <BackButton to="/students" />
        <SaveButton isLoading={isLoading} />
      </TopBar>

      <Container>
        <LabeledField htmlFor="name">
          <strong>Nome Completo</strong>
          <Input name="name" type="text" id="name" />
        </LabeledField>

        <LabeledField htmlFor="email">
          <strong>Endereço de E-mail</strong>
          <Input name="email" type="text" id="email" />
        </LabeledField>

        <div className="horizontal">
          <LabeledField htmlFor="birthdate">
            <strong>Data de Nascimento</strong>
            <DatePicker
              style={{ width: '50px' }}
              name="birthdate"
              id="birthdate"
              selected={birthdate}
              onChange={date => setBirthdate(date)}
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
      </Container>
    </Wrapper>
  );
}

StudentForm.propTypes = {
  title: PropTypes.string.isRequired,
  initialData: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    birthdate: PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.string,
    ]),
    height: PropTypes.number,
    weight: PropTypes.number,
  }),
  isLoading: PropTypes.bool,
};

StudentForm.defaultProps = {
  isLoading: false,
  initialData: {},
};
