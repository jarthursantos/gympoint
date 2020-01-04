import React from 'react';
import {ActivityIndicator} from 'react-native';

import {Container, Text} from './styles';

export default function Button({isLoading, children, ...rest}) {
  return (
    <Container enabled={!isLoading} {...rest}>
      {isLoading ? (
        <ActivityIndicator color="#fff" size={24} />
      ) : (
        <Text>{children}</Text>
      )}
    </Container>
  );
}
