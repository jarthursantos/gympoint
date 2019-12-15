import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { navigate } from '~/store/modules/navigation/actions';

import TopBar from '~/components/TopBar';
import BackButton from '~/components/BackButton';
import SaveButton from '~/components/SaveButton';
import { Wrapper, Container } from './styles';

export default function RegistrationRegister() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(navigate('registrations'));
  }, [dispatch]);

  return (
    <Wrapper>
      <Container>
        <TopBar title="Cadastra de matrícula">
          <BackButton to="/registrations" />
          <SaveButton />
        </TopBar>
      </Container>
    </Wrapper>
  );
}
