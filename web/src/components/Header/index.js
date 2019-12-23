import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { signOut } from '~/store/modules/auth/actions';
import { Container, Content, Profile } from './styles';
import Notifications from '../Notifications';

import logo from '~/assets/small-logo.svg';

export default function Header() {
  const dispatch = useDispatch();

  const { avatar, name } = useSelector(state => state.user.profile);
  const { activeTab } = useSelector(state => state.navigation);

  function handleSignOut() {
    dispatch(signOut());
  }

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
              <Link to="/profile">{name}</Link>
              <button type="button" onClick={handleSignOut}>
                sair do sistema
              </button>
            </div>
            <Link to="/profile">
              <img
                className={activeTab === 'profile' ? 'active' : ''}
                src={
                  avatar
                    ? avatar.url
                    : 'https://api.adorable.io/avatars/50/abott@adorable.png'
                }
                alt="Avatar"
              />
            </Link>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
