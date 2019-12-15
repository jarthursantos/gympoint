import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function LabeledField({ children }) {
  return <Container>{children}</Container>;
}

LabeledField.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.element, PropTypes.func]))
      .isRequired,
  ]).isRequired,
};
