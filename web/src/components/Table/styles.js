import styled from 'styled-components';

export const Container = styled.table`
  text-align: left;
  font-size: 16px;

  th,
  td {
    white-space: nowrap;
  }

  td.collapsing {
    width: 1px;

    button + button {
      margin-left: 16px;
    }

    a + a {
      margin-left: 16px;
    }

    a + button {
      margin-left: 16px;
    }

    button + a {
      margin-left: 16px;
    }
  }

  th.centered,
  td.centered {
    text-align: center;
  }

  td {
    color: #666;
    padding: 16px 0;
  }

  th {
    color: #444;
    text-transform: uppercase;
    padding-bottom: 4px;
  }

  tr + tr {
    td {
      border-top: 1px solid #eee;
    }
  }

  tbody {
    tr:last-child {
      td {
        padding: 16px 0 0;
      }
    }
  }
`;
