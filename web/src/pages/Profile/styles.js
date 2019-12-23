import styled from 'styled-components';
import { Form } from '@rocketseat/unform';

export const Wrapper = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Container = styled(Form)`
  width: 100%;
  max-width: 1060px;

  & > div {
    padding: 50px 60px;
  }

  .horizontal {
    display: flex;
  }

  .fill {
    flex: 1;
  }

  .vertical {
    display: flex;
    flex-direction: column;
  }

  .fields {
    margin-left: 30px;

    label + label {
      margin-top: 16px;
    }

    span {
      color: #ee4d64;
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
  }
`;
