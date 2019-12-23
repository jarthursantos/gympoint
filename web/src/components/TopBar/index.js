import React from 'react';

import PropTypes from 'prop-types';

import { Container } from './styles';

export default function TobBar({ title, children }) {
  return (
    <Container>
      <strong>{title}</strong>
      <aside>{children}</aside>
    </Container>
  );
}

TobBar.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.element, PropTypes.func]))
      .isRequired,
  ]),
};

TobBar.defaultProps = {
  title: 'Gympoint',
  children: null,
};
