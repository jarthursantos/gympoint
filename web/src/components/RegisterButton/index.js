import React from 'react';
import { MdAdd } from 'react-icons/md';

import PropTypes from 'prop-types';

import { Container } from './styles';

export default function RegisterButton({ to }) {
  return (
    <Container to={to}>
      <MdAdd size={20} color="#fff" />
      Cadastrar
    </Container>
  );
}

RegisterButton.propTypes = {
  to: PropTypes.string.isRequired,
};
