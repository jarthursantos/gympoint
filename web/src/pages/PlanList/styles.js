import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 1060px;

  table {
    th,
    td {
      width: 33%;
    }

    tr.deprecated {
      opacity: 0.7;

      a,
      button {
        cursor: not-allowed;
      }
    }

    td {
      div {
        display: flex;
        align-items: center;

        small {
          user-select: none;
          color: #fff;
          background: #999;
          margin-left: 8px;
          padding: 2px 4px;
          border-radius: 4px;
        }
      }
    }
  }
`;
