import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {Container, Message} from './styles';

export default function EmptyState() {
  return (
    <Container>
      <Icon name="sentiment-dissatisfied" size={64} color="#666" />
      <Message>Não há dados para serem exibidos</Message>
    </Container>
  );
}
