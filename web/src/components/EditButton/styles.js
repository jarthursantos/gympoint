import styled from 'styled-components';
import { darken } from 'polished';
import { Link } from 'react-router-dom';

export const Container = styled(Link)`
  font-size: 16px;
  border: none;
  background: none;
  text-transform: lowercase;

  color: #4d85ee;

  &:hover {
    color: ${darken(0.1, '#4d85ee')};
  }
`;
