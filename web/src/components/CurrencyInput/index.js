import React from 'react';

import PropTypes from 'prop-types';

import { Container, Currency } from './styles';

export default function CurrencyInput({ children }) {
  return (
    <Container>
      <Currency>R$</Currency>
      {children}
    </Container>
  );
}

CurrencyInput.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.element, PropTypes.func]))
      .isRequired,
  ]),
};

CurrencyInput.defaultProps = {
  children: null,
};
