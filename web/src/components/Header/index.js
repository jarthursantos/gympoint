import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import logo from '~/assets/small-logo.svg';
import { signOut } from '~/store/modules/auth/actions';
import { formatInitials } from '~/util/format';

import Notifications from '../Notifications';
import { Container, Content, Profile } from './styles';

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
              {avatar ? (
                <img
                  className={activeTab === 'profile' ? 'active' : ''}
                  src={avatar.url}
                  alt="Avatar"
                />
              ) : (
                <div
                  className={`name ${activeTab === 'profile' ? 'active' : ''}`}
                >
                  {formatInitials(name)}
                </div>
              )}
            </Link>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
