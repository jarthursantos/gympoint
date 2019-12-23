import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { Input } from '@rocketseat/unform';

import { updateProfileRequest } from '~/store/modules/user/actions';
import { navigate } from '~/store/modules/navigation/actions';

import { Wrapper, Container } from './styles';
import AvatarInput from './AvatarInput';
import TopBar from '~/components/TopBar';
import LabeledField from '~/components/LabeledField';
import SaveButton from '~/components/SaveButton';

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  useEffect(() => {
    dispatch(navigate('profile'));
  }, [dispatch]);

  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  const schema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string()
      .email()
      .required(),
    password: Yup.string().when('oldPassword', (oldPassword, field) =>
      oldPassword ? field.required() : field
    ),
    confirmPassword: Yup.string().when('password', (password, field) =>
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
      <Container schema={schema} initialData={profile} onSubmit={handleSubmit}>
        <TopBar title="Perfil">
          <SaveButton isLoading={isLoading} />
        </TopBar>

        <div className="horizontal">
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
                name="oldPassword"
                type="password"
                id="oldPassword"
              />
            </LabeledField>
            <LabeledField htmlFor="password">
              <strong>Nova senha</strong>
              <Input
                placeholder="Nova senha"
                name="password"
                type="password"
                id="password"
              />
            </LabeledField>
            <LabeledField htmlFor="confirmPassword">
              <strong>Confirmação da senha</strong>
              <Input
                placeholder="Repita sua nova senha"
                name="confirmPassword"
                type="password"
                id="confirmPassword"
              />
            </LabeledField>
          </div>
        </div>
      </Container>
    </Wrapper>
  );
}
