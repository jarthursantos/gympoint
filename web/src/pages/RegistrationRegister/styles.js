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

  #plan,
  #student {
    input {
      height: 31px;
    }
  }

  .fields {
    padding: 50px 60px;
    display: flex;
    flex-direction: column;

    label + label {
      margin-left: 16px;
    }

    .horizontal {
      margin-top: 20px;
      padding: 0;
      flex-direction: row;
    }
  }

  .react-datepicker__input-container {
    input {
      width: 100%;
    }
  }
`;
