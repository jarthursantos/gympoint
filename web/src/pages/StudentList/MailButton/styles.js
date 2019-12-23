import styled from 'styled-components';
import { darken } from 'polished';

export const Link = styled.a`
  font-size: 16px;
  border: none;
  background: none;
  text-transform: lowercase;

  color: #4d85ee;

  &:hover {
    color: ${darken(0.1, '#4d85ee')};
  }
`;
