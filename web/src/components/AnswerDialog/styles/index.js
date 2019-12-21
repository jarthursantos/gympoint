import styled from 'styled-components';
import { darken } from 'polished';

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 390px;
  min-width: 250px;

  strong {
    color: #444;
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  p {
    color: #666;
    font-size: 16px;
    line-height: 26px;
    margin-bottom: 20px;
  }

  form {
    display: flex;
    flex-direction: column;

    textarea {
      color: #999;
      font-size: 16px;
      border-radius: 4px;
      padding: 12px 16px;
      border: 1px solid #dddddd;
      resize: none;

      &::placeholder {
        color: #999;
        font-size: 16px;
      }
    }

    span {
      color: ${darken(0.03, '#ee4d64')};
      align-self: flex-start;
      margin-top: 8px;
      font-weight: bold;
    }

    button {
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
      margin-top: 20px;

      background: #ee4d64;

      &:hover {
        background: ${darken(0.03, '#ee4d64')};
      }

      & + button {
        margin-left: 16px;
      }

      &:disabled {
        cursor: not-allowed;
      }
    }
  }
`;
