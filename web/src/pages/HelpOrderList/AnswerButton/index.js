import React from 'react';

import { Container } from './styles';

export default function AnswerButton(props) {
  return (
    <Container {...props} type="button">
      Responder
    </Container>
  );
}
