import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import logo from '~/assets/logo.png';
import Button from '~/components/Button';
import {signInRequest} from '~/store/modules/auth/actions';

import {Container, Logo, CodeInput} from './styles';

export default function SignIn() {
  const dispatch = useDispatch();

  const [code, setCode] = useState('');
  const isLoading = useSelector(state => state.auth.loading);

  function handleLogIn() {
    dispatch(signInRequest(code));
  }

  return (
    <Container>
      <Logo source={logo} />
      <CodeInput
        autoCapitalize="none"
        autoCompleteType="off"
        autoCorrect={false}
        placeholder="Informe seu código"
        onSubmitEditing={handleLogIn}
        text={code}
        onChangeText={setCode}
      />
      <Button isLoading={isLoading} onPress={handleLogIn}>
        Entrar no sistema
      </Button>
    </Container>
  );
}
