import React from 'react';

import { Container } from './styles';

export default function TobBar({ title, children }) {
  return (
    <Container>
      <strong>{title}</strong>
      <aside>{children}</aside>
    </Container>
  );
}
