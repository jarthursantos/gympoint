import React, { useState, useEffect } from 'react';

import { Input } from '@rocketseat/unform';
import PropTypes from 'prop-types';

import BackButton from '~/components/BackButton';
import DatePicker from '~/components/DatePicker';
import ErrorState from '~/components/ErrorState';
import LabeledField from '~/components/LabeledField';
import SaveButton from '~/components/SaveButton';
import TopBar from '~/components/TopBar';

import schema from './schema';
import { Wrapper, Container } from './styles';

export default function StudentForm({
  title,
  isLoading,
  saving,
  error,
  locked,
  initialData,
  ...rest
}) {
  const [birthdate, setBirthdate] = useState(null);

  useEffect(() => {
    if (!initialData) return;

    setBirthdate(initialData.birthdate);
  }, [initialData]);

  return (
    <Wrapper
      initialData={initialData}
      autoComplete="off"
      schema={schema}
      {...rest}
    >
      <TopBar isLoading={isLoading} title={title}>
        <BackButton to="/students" />
        <SaveButton isLoading={saving} disabled={locked} />
      </TopBar>

      <Container>
        {error ? (
          <ErrorState />
        ) : (
          <>
            <LabeledField htmlFor="name">
              <strong>Nome Completo</strong>
              <Input name="name" type="text" id="name" disabled={locked} />
            </LabeledField>

            <LabeledField htmlFor="email">
              <strong>Endereço de E-mail</strong>
              <Input name="email" type="text" id="email" disabled={locked} />
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
                  disabled={locked}
                />
              </LabeledField>
              <LabeledField htmlFor="weight">
                <strong>
                  Peso <small>(em kg)</small>
                </strong>
                <Input
                  name="weight"
                  type="number"
                  step={0.01}
                  id="weight"
                  disabled={locked}
                />
              </LabeledField>
              <LabeledField htmlFor="height">
                <strong>Altura</strong>
                <Input
                  name="height"
                  type="number"
                  step={0.01}
                  id="height"
                  disabled={locked}
                />
              </LabeledField>
            </div>
          </>
        )}
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
  saving: PropTypes.bool,
  locked: PropTypes.bool,
  error: PropTypes.bool,
  isLoading: PropTypes.bool,
};

StudentForm.defaultProps = {
  saving: false,
  locked: false,
  error: false,
  isLoading: false,
  initialData: {},
};
