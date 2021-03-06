import React from 'react';
import { MdExitToApp } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import logo from '~/assets/small-logo.svg';
import { signOut } from '~/store/modules/auth/actions';
import { formatInitials } from '~/util/format';

import { Container, Content, Profile } from './styles';

export default function Header() {
  const dispatch = useDispatch();

  const { avatar, name } = useSelector(state => state.user.profile);

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <>
      <Container>
        <Content>
          <nav>
            <img src={logo} alt="Gympoint" />
            <NavLink to="/students" activeClassName="active">
              ALUNOS
            </NavLink>
            <NavLink to="/plans" activeClassName="active">
              PLANOS
            </NavLink>
            <NavLink to="/registrations" activeClassName="active">
              MATRÍCULAS
            </NavLink>
            <NavLink to="/helpOrders" activeClassName="active">
              PEDIDOS DE AUXÍLIO
            </NavLink>
          </nav>

          <Profile>
            <div>
              <NavLink to="/profile">{name}</NavLink>
              <button type="button" onClick={handleSignOut}>
                <MdExitToApp size={14} /> sair do sistema
              </button>
            </div>
            <NavLink to="/profile" activeClassName="active">
              {avatar ? (
                <img src={avatar.url} alt="Avatar" />
              ) : (
                <div className="name">{formatInitials(name)}</div>
              )}
            </NavLink>
          </Profile>
        </Content>
      </Container>
    </>
  );
}
