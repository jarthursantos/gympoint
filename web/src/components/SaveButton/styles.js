import { darken } from 'polished';
import styled from 'styled-components';

export const Container = styled.button`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: bold;
  border-radius: 4px;
  border: none;
  text-transform: uppercase;
  color: #fff;
  background: #ee4d64;

  & > svg {
    margin-right: 8px;
  }

  &:hover {
    background: ${darken(0.03, '#ee4d64')};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;

    &:hover {
      background: #ee4d64;
    }
  }
`;
