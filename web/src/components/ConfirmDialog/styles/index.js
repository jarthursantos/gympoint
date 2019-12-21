import styled from 'styled-components';
import { darken } from 'polished';

export const Content = styled.div`
  margin-bottom: 20px;
`;

export const Actions = styled.div`
  display: flex;
  margin-top: 20px;

  button {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    height: 45px;
    font-size: 16px;
    line-height: 20px;
    border: 0;
    min-width: 130px;
    padding: 0 16px;
    border-radius: 4px;
    font-weight: bold;
    text-transform: uppercase;

    & + button {
      margin-left: 16px;
    }

    &:disabled {
      cursor: not-allowed;
    }
  }

  button.primary {
    background: #ee4d64;

    &:hover {
      background: ${darken(0.03, '#ee4d64')};
    }
  }

  button.secondary {
    background: #ccc;

    &:hover {
      background: ${darken(0.03, '#ccc')};
    }
  }
`;
