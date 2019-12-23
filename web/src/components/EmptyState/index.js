import React from 'react';
import { MdSentimentDissatisfied } from 'react-icons/md';

import { Container } from './styles';

export default function EmptyState() {
  return (
    <Container>
      <MdSentimentDissatisfied size={80} color="#666" />
      <span>Não existem dados para serem exibidos</span>
    </Container>
  );
}
