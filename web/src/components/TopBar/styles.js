import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > div {
    display: flex;
    flex-direction: row;
    align-items: center;

    strong {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #444;
      font-size: 24px;
      line-height: 36px;
    }

    & > div {
      margin-left: 16px;
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;
