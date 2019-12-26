import Scrollbar from 'react-perfect-scrollbar';

import { darken } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border-radius: 4px;
  border: 1px solid #ddd;
  padding: 0px 13px 0px 16px;
  height: 45px;

  span {
    align-self: center;
    font-size: 14px;
    font-weight: normal;
    margin: 0;
    color: #666;
  }

  &:hover {
    background: #efefef;
  }

  &:disabled {
    background: #f0f0f0;
  }
`;

export const ModalContent = styled.form`
  display: flex;
  flex-direction: column;

  .content {
    display: flex;
    align-items: center;
    justify-content: center;

    min-height: 250px;
    max-height: 250px;
    width: 440px;
  }
`;

export const SearchBar = styled.input`
  display: flex;
  align-items: center;
  margin: -30px -30px 0;

  flex: 1;
  border: none;
  padding: 30px;
`;

export const StudentList = styled(Scrollbar)`
  margin: 0 -30px 20px;
  min-height: 250px;
  max-height: 250px;
  width: 500px;
`;

export const Student = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 30px;
  background: ${props => (props.selected ? '#ccc' : '#fff')};

  div {
    display: flex;
    flex-direction: column;

    strong {
      color: #444;
    }

    small {
      color: #666;
    }
  }

  span {
    color: #444;
  }

  &:hover {
    background: ${props => (props.selected ? '#ccc' : '#ddd')};
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  button + button {
    flex: 1;
    margin-left: 16px;
  }

  button {
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

    &.confirm {
      background: #ee4d64;

      &:hover {
        background: ${darken(0.03, '#ee4d64')};
      }
    }

    &.cancel {
      background: #ccc;

      &:hover {
        background: ${darken(0.03, '#ccc')};
      }
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;

      &:hover {
        background: #ee4d64;
      }
    }
  }
`;
