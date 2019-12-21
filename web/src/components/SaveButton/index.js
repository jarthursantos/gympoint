import React from 'react';
import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';

import { MdSave } from 'react-icons/md';

import { Container } from './styles';

export default function SaveButton({ isLoading }) {
  return (
    <Container type="submit">
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
