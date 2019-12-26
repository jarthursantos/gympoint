import { Form } from '@rocketseat/unform';
import styled from 'styled-components';

import BodyContainer from '~/components/BodyContainer';

export const Wrapper = styled(Form)`
  flex: 1;
`;

export const Container = styled(BodyContainer)`
  #plan,
  #student {
    input {
      height: 31px;
    }
  }

  .horizontal {
    display: flex;
    margin-top: 20px;
    flex-direction: row;

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

export const Observation = styled.span`
  margin-top: 16px;
  font-size: 13px;
  color: #666;
  font-weight: 500;
`;
