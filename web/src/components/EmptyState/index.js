import React from 'react';
import { MdSentimentDissatisfied } from 'react-icons/md';

import PropTypes from 'prop-types';

import { Container } from './styles';

export default function EmptyState({ message }) {
  return (
    <Container>
      <MdSentimentDissatisfied size={80} color="#666" />
      <span>{message}</span>
    </Container>
  );
}

EmptyState.propTypes = {
  message: PropTypes.string,
};

EmptyState.defaultProps = {
  message: 'Não existem dados para serem exibidos',
};
