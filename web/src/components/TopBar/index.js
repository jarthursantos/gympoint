import React from 'react';

import PropTypes from 'prop-types';

import ActivityIndicator from '~/components/ActivityIndicator';

import { Container } from './styles';

export default function TobBar({ title, isLoading, children }) {
  return (
    <Container>
      <div>
        <strong>{title}</strong>
        {isLoading && <ActivityIndicator color="#666" />}
      </div>
      <aside>{children}</aside>
    </Container>
  );
}

TobBar.propTypes = {
  title: PropTypes.string,
  isLoading: PropTypes.bool,
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
  isLoading: false,
};
