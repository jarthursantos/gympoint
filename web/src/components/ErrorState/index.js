import React from 'react';
import { MdSentimentVeryDissatisfied } from 'react-icons/md';

import { Container } from './styles';

export default function ErrorState() {
  return (
    <Container>
      <MdSentimentVeryDissatisfied size={80} color="#666" />
      <span>Ocorreu um erro ao tentar se comunicar com o servidor</span>
    </Container>
  );
}
