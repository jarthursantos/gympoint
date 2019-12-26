import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  background: #fff;
  margin-left: 16px;
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  height: 36px;

  & > svg {
    position: absolute;
    left: 16px;
  }

  & > input {
    padding: 7px 16px 7px 46px;
    color: #999;
    border: none;
    font-size: 14px;
    z-index: 0;
    background: transparent;

    &::placeholder {
      color: #999;
      font-size: 14px;
    }
  }
`;
