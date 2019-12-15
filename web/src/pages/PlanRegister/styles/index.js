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

  background: white;

  div {
    padding: 50px 60px;
    display: flex;
    flex-direction: column;

    label + label {
      margin-left: 16px;
    }

    div {
      margin-top: 20px;
      padding: 0;
      flex-direction: row;
    }
  }
`;
