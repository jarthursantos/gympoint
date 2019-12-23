import { Link } from 'react-router-dom';

import { darken } from 'polished';
import styled from 'styled-components';

export const Container = styled(Link)`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: bold;
  border-radius: 4px;
  border: none;
  text-transform: uppercase;
  color: #fff;
  margin-right: 16px;
  background: #ccc;

  svg {
    margin-right: 8px;
  }

  &:hover {
    background: ${darken(0.03, '#ccc')};
  }
`;
