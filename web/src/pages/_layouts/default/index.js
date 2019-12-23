import React from 'react';

import PropTypes from 'prop-types';

import Header from '~/components/Header';

import { Wrapper, Container, CenterContent } from './styles';

export default function DefaultLayout({ children }) {
  return (
    <Wrapper>
      <Header />
      <Container>
        <CenterContent>{children}</CenterContent>
      </Container>
    </Wrapper>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
