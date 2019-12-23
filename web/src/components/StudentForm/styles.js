import styled from 'styled-components';
import { Form } from '@rocketseat/unform';

import BodyContainer from '~/components/BodyContainer';

export const Wrapper = styled(Form)`
  flex: 1;
`;

export const Container = styled(BodyContainer)`
  & > label + label {
    margin-top: 20px;
  }

  .horizontal {
    display: flex;
    flex-direction: row;
    margin-top: 20px;

    label + label {
      margin-left: 16px;
    }
  }

  .react-datepicker__input-container {
    input {
      width: 100%;
    }
  }
`;
