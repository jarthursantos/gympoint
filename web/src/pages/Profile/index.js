import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import LabeledField from '~/components/LabeledField';
import SaveButton from '~/components/SaveButton';
import TopBar from '~/components/TopBar';
import { updateProfileRequest } from '~/store/modules/user/actions';

import AvatarInput from './AvatarInput';
import { Wrapper, Form, Container } from './styles';

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);
  const isLoading = useSelector(state => state.user.isLoading);

  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    setOldPassword('');
    setPassword('');
    setConfirmPassword('');
  }, [profile]);

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  const schema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string()
      .email()
      .required(),
    old_password: Yup.string(),
    password: Yup.string().when('old_password', (old_password, field) =>
      old_password ? field.required() : field
    ),
    confirm_password: Yup.string().when('password', (password, field) =>
      password
        ? field
            .required()
            .oneOf([Yup.ref('password')], 'As senhas não coincidem')
        : field
    ),
    avatar_id: Yup.number().integer(),
  });

  return (
    <Wrapper>
      <Form schema={schema} initialData={profile} onSubmit={handleSubmit}>
        <TopBar title="Perfil">
          <SaveButton isLoading={isLoading} />
        </TopBar>

        <Container className="horizontal">
          <AvatarInput className="avatar" name="avatar_id" />

          <div className="fill vertical fields">
            <LabeledField htmlFor="name">
              <strong>Nome</strong>
              <Input placeholder="Nome completo" name="name" id="name" />
            </LabeledField>
            <LabeledField htmlFor="email">
              <strong>E-mail</strong>
              <Input
                placeholder="Seu endereço de e-mails"
                name="email"
                type="email"
                id="email"
              />
            </LabeledField>
            <hr />
            <LabeledField htmlFor="oldPassword">
              <strong>Senha atual</strong>
              <Input
                placeholder="Sua senha atual"
                name="old_password"
                type="password"
                id="oldPassword"
                value={oldPassword}
                onChange={e => setOldPassword(e.target.value)}
              />
            </LabeledField>
            <LabeledField htmlFor="password">
              <strong>Nova senha</strong>
              <Input
                placeholder="Nova senha"
                name="password"
                type="password"
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </LabeledField>
            <LabeledField htmlFor="confirmPassword">
              <strong>Confirmação da senha</strong>
              <Input
                placeholder="Repita sua nova senha"
                name="confirm_password"
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
            </LabeledField>
          </div>
        </Container>
      </Form>
    </Wrapper>
  );
}
