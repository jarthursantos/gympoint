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
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CenterContent = styled.div`
  flex: 1;

  width: 100%;
  max-width: 1150px;
  padding: 30px 30px 0;
`;
