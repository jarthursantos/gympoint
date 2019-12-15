import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  padding: 0 30px;
  align-items: center;
  justify-content: space-between;

  strong {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #444;
    font-size: 24px;
    line-height: 36px;
  }

  aside {
    display: flex;
    align-items: center;

    div {
      margin-left: 16px;
      display: flex;
      border: 1px solid #ddd;
      border-radius: 4px;
      padding: 7px 16px;

      svg {
        margin-right: 16px;
      }

      input {
        color: #999;
        border: none;
        font-size: 14px;

        &::placeholder {
          color: #999;
          font-size: 14px;
        }
      }
    }
  }
`;
