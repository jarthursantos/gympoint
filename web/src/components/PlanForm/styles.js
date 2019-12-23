import styled from 'styled-components';
import { Form } from '@rocketseat/unform';

export const Container = styled(Form)`
  width: 100%;
  max-width: 1060px;

  & > div {
    padding: 50px 60px;
    display: flex;
    flex-direction: column;

    label + label {
      margin-left: 16px;
    }

    div {
      display: flex;
      flex-direction: column;

      margin-top: 20px;
      padding: 0;
      flex-direction: row;
    }
  }
`;
