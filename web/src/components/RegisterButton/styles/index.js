import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled(Link)`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: bold;
  border-radius: 4px;
  border: none;
  text-transform: uppercase;
  color: #fff;
  background: #ee4d64;

  svg {
    margin-right: 8px;
  }
`;