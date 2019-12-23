import styled from 'styled-components';

import BodyContainer from '~/components/BodyContainer';

export const Wrapper = styled.div`
  flex: 1;
`;

export const Container = styled(BodyContainer)`
  table {
    th,
    td {
      width: 33%;
    }
  }
`;
