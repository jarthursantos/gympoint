import { Form } from '@rocketseat/unform';
import styled from 'styled-components';

import BodyContainer from '~/components/BodyContainer';

export const Wrapper = styled(Form)`
  flex: 1;
`;

export const Container = styled(BodyContainer)`
  .horizontal {
    display: flex;
    flex-direction: row;

    margin-top: 20px;

    label + label {
      margin-left: 16px;
    }
  }
`;
