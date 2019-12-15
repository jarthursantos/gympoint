import styled from 'styled-components';

export const Container = styled.label`
  display: flex;
  flex-direction: column;
  flex: 1;

  strong {
    font-weight: bold;
    font-size: 14px;
    color: #444;
    text-transform: uppercase;
    margin-bottom: 8px;

    small {
      font-size: 14px;
      text-transform: none;
    }
  }

  span {
    color: #ee4d64;
    align-self: flex-start;
    margin-top: 8px;
    font-weight: bold;
  }

  input {
    color: #666;
    font-size: 14px;
    height: 45px;
    border-radius: 4px;
    border: 1px solid #ddd;
    padding: 0 16px;

    &::placeholder {
      font-size: 14px;
      color: #999;
    }

    :disabled {
      background: #e5e5e5;
    }
  }
`;
