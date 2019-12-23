import React from 'react';
import ReactModal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',

    padding: 30,
    border: 'none',
    borderRadios: 4,
  },

  overlay: {
    backgroundColor: 'rgba(0, 0, 0, .7)',
  },
};

export default function Modal(props) {
  return <ReactModal ariaHideApp={false} style={customStyles} {...props} />;
}
