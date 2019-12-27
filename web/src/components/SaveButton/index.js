import React from 'react';
import { MdSave } from 'react-icons/md';

import PropTypes from 'prop-types';

import ActivityIndicator from '~/components/ActivityIndicator';

import { Container } from './styles';

export default function SaveButton({ isLoading, ...rest }) {
  return (
    <Container type="submit" {...rest}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <MdSave size={20} color="#fff" />
          Salvar
        </>
      )}
    </Container>
  );
}

SaveButton.propTypes = {
  isLoading: PropTypes.bool,
};

SaveButton.defaultProps = {
  isLoading: false,
};
