import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    label + label {
      margin-top: 16px;
    }

    span {
      color: #fb6f91;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }

    hr {
      border: 0;
      height: 1px;
      background: #eeeeee;
      margin: 20px 0;
    }

    button {
      text-transform: uppercase;
      width: 100%;
      margin: 20px 0 0;
      height: 44px;
      background: #ee4d64;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: all 0.2s;

      &:hover {
        background: ${darken(0.03, '#ee4d64')};
      }
    }
  }
`;
