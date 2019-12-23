import React from 'react';

import PropTypes from 'prop-types';

import { Link } from './styles';

export default function MailButton({ mail }) {
  return (
    <Link href={`mailto:${mail}`} target="_blank">
      {mail}
    </Link>
  );
}

MailButton.propTypes = {
  mail: PropTypes.string.isRequired,
};
