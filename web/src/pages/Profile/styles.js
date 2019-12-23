import { Form as BaseForm } from '@rocketseat/unform';
import styled from 'styled-components';

import BodyContainer from '~/components/BodyContainer';

export const Wrapper = styled.div`
  flex: 1;
`;

export const Container = styled(BodyContainer)`
  flex-direction: row;
`;

export const Form = styled(BaseForm)`
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
