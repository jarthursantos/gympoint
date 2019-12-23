import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #ee4d64;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 360px;
  padding: 50px 30px;
  text-align: center;
  background: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border-radius: 4px;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 10px;

    label {
      text-align: start;
      display: flex;
      flex-direction: column;
      margin-top: 20px;
      font-size: 14px;
      color: #444;
      font-weight: bold;

      input {
        margin-top: 8px;
        background: #fff;
        border: 1px solid #dddddd;
        border-radius: 4px;
        color: #666;
        font-weight: 16px;
        height: 44px;
        padding: 0 15px;

        &::placeholder {
          color: #999;
          font-weight: 16px;
        }
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

      text-transform: uppercase;
      margin-top: 15px;
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
