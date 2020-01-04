import {RectButton} from 'react-native-gesture-handler';
import BaseIcon from 'react-native-vector-icons/MaterialIcons';

import styled from 'styled-components/native';

export const Container = styled(RectButton)`
  background: #fff;
  border-radius: 4px;
  margin-bottom: 10px;
  padding: 20px;
`;

export const TitleContainer = styled.View`
  align-items: center;
  flex-direction: row;
`;

export const Header = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const Icon = styled(BaseIcon).attrs(props => ({
  name: 'check-circle',
  size: 16,
  color: props.answered ? '#42CB59' : '#999',
}))`
  margin-right: 8px;
`;

export const Title = styled.Text`
  color: ${props => (props.answered ? '#42CB59' : '#999')};
  font-size: 14px;
  font-weight: bold;
`;

export const AskDate = styled.Text`
  color: #666;
  font-size: 14px;
`;

export const Ask = styled.Text.attrs({
  numberOfLines: 3,
})`
  color: #666;
  font-size: 14px;
  /* text-align: justify; */
  line-height: 24px;
`;
