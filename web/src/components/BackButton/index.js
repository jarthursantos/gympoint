import React from 'react';
import { MdArrowBack } from 'react-icons/md';

import PropTypes from 'prop-types';

import { Container } from './styles';

export default function BackButton({ to }) {
  return (
    <Container to={to}>
      <MdArrowBack size={20} color="#fff" />
      Voltar
    </Container>
  );
}

BackButton.propTypes = {
  to: PropTypes.string.isRequired,
};
