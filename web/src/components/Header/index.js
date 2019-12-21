import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { signOut } from '~/store/modules/auth/actions';
import { Container, Content, Profile } from './styles';
import Notifications from '../Notifications';

import logo from '~/assets/small-logo.svg';

export default function Header() {
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }

  const { avatar, name } = useSelector(state => state.user.profile);
  const { activeTab } = useSelector(state => state.navigation);

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="Gympoint" />
          <Link
            to="/students"
            className={activeTab === 'students' ? 'active' : ''}
          >
            ALUNOS
          </Link>
          <Link to="/plans" className={activeTab === 'plans' ? 'active' : ''}>
            PLANOS
          </Link>
          <Link
            to="/registrations"
            className={activeTab === 'registrations' ? 'active' : ''}
          >
            MATRÍCULAS
          </Link>
          <Link
            to="/helpOrders"
            className={activeTab === 'helpOrders' ? 'active' : ''}
          >
            PEDIDOS DE AUXÍLIO
          </Link>
        </nav>

        <aside>
          <Notifications />
          <Profile>
            <div>
              <strong>{name}</strong>
              <button type="button" onClick={handleSignOut}>
                sair do sistema
              </button>
            </div>
            <img
              src={
                avatar
                  ? avatar.url
                  : 'https://api.adorable.io/avatars/50/abott@adorable.png'
              }
              alt="Avatar"
            />
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}

// TODO: profile
