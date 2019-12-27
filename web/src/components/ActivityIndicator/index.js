import React from 'react';
import ReactLoading from 'react-loading';

import PropTypes from 'prop-types';

export default function ActivityIndicator({ color, size }) {
  return <ReactLoading type="spin" color={color} height={size} width={size} />;
}

ActivityIndicator.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

ActivityIndicator.defaultProps = {
  color: '#fff',
  size: 20,
};
