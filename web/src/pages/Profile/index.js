import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

import { updateProfileRequest } from '~/store/modules/user/actions';

import { Container } from './styles';
import AvatarInput from './AvatarInput';
import LabeledField from '~/components/LabeledField';

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  return (
    <Container>
      <Form initialData={profile} onSubmit={handleSubmit}>
        <AvatarInput name="avatar_id" />
        <LabeledField htmlFor="name">
          <strong>Nome</strong>
          <Input name="name" placeholder="Nome completo" id="name" />
        </LabeledField>
        <LabeledField htmlFor="email">
          <strong>E-mail</strong>
          <Input
            name="email"
            placeholder="Seu endereço de e-mails"
            type="email"
            id="email"
          />
        </LabeledField>
        <hr />{' '}
        <LabeledField htmlFor="oldPassword">
          <strong>Senha atual</strong>
          <Input
            name="oldPassword"
            placeholder="Sua senha atual"
            type="password"
            id="oldPassword"
          />
        </LabeledField>
        <LabeledField htmlFor="password">
          <strong>Nova senha</strong>
          <Input
            name="password"
            placeholder="Nova senha"
            type="password"
            id="password"
          />
        </LabeledField>
        <LabeledField htmlFor="confirmPassword">
          <strong>Confirmação da senha</strong>
          <Input
            name="confirmPassword"
            placeholder="Repita sua nova senha"
            type="password"
            id="confirmPassword"
          />
        </LabeledField>
        <button type="submit">Atualizar Perfil</button>
      </Form>
    </Container>
  );
}
