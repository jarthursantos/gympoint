import React from 'react';

import { MdSave } from 'react-icons/md';

import { Container } from './styles';

export default function SaveButton() {
  return (
    <Container type="submit">
      <MdSave size={20} color="#fff" />
      Salvar
    </Container>
  );
}
