import React from 'react';
import { MdSave } from 'react-icons/md';
import ReactLoading from 'react-loading';

import PropTypes from 'prop-types';

import { Container } from './styles';

export default function SaveButton({ isLoading, ...rest }) {
  return (
    <Container type="submit" {...rest}>
      {isLoading ? (
        <ReactLoading type="spin" color="#fff" height={20} width={20} />
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
