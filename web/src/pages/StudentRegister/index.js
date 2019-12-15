import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { navigate } from '~/store/modules/navigation/actions';

import TopBar from '~/components/TopBar';
import BackButton from '~/components/BackButton';
import SaveButton from '~/components/SaveButton';
import { Wrapper, Container } from './styles';

export default function StudentRegister() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(navigate('students'));
  }, [dispatch]);

  return (
    <Wrapper>
      <Container>
        <TopBar title="Cadastrar aluno">
          <BackButton to="/students" />
          <SaveButton />
        </TopBar>
      </Container>
    </Wrapper>
  );
}
