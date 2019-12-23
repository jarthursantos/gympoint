import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  margin-left: 16px;
  display: flex;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 7px 16px;

  & > svg {
    margin-right: 16px;
  }

  & > input {
    color: #999;
    border: none;
    font-size: 14px;

    &::placeholder {
      color: #999;
      font-size: 14px;
    }
  }
`;
