import styled from 'styled-components';
import Scrollbar from 'react-perfect-scrollbar';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #f5f5f5;
`;

export const Container = styled(Scrollbar)`
  flex: 1;
`;
