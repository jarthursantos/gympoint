import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Container, Content, Profile } from './styles';
import Notifications from '../Notifications';

import logo from '~/assets/small-logo.svg';

export default function Header() {
  const { avatar, name } = useSelector(state => state.user.profile);

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="GoBarber" />
          <Link to="/dashboard" className="active">
            ALUNOS
          </Link>
          <Link to="/dashboard">PLANOS</Link>
          <Link to="/dashboard">MATRÍCULAS</Link>
          <Link to="/dashboard">PEDIDOS DE AUXÍLIO</Link>
        </nav>

        <aside>
          <Notifications />
          <Profile>
            <div>
              <strong>{name}</strong>
              <Link to="/profile">sair do sistema</Link>
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
