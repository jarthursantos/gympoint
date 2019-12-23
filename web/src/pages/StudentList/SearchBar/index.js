import React from 'react';
import { MdSearch } from 'react-icons/md';

import { Container } from './styles';

export default function SearchBar(props) {
  return (
    <Container>
      <MdSearch size={20} color="#999" />
      <input {...props} type="text" placeholder="Buscar aluno" />
    </Container>
  );
}
