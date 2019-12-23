import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.button`
  font-size: 15px;
  border: none;
  background: none;
  text-transform: lowercase;

  color: #de3b3b;

  &:hover {
    color: ${darken(0.1, '#de3b3b')};
  }
`;
