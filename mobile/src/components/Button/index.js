import React from 'react';
import {ActivityIndicator} from 'react-native';

import PropTypes from 'prop-types';

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

Button.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.element, PropTypes.func]))
      .isRequired,
  ]).isRequired,
};

Button.defaultProps = {
  isLoading: false,
};
