import {RectButton} from 'react-native-gesture-handler';

import styled from 'styled-components/native';

export const Container = styled(RectButton)`
  align-items: center;
  justify-content: center;

  background: #ee4e62;
  border-radius: 4px;
  height: 45px;
`;

export const Text = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;
