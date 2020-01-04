import styled from 'styled-components/native';

import BaseButton from '~/components/Button';

export const Container = styled.SafeAreaView`
  background-color: #f5f5f5;
  flex: 1;
`;

export const Button = styled(BaseButton)`
  margin: 20px;
`;

export const HelpOrderList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {paddingHorizontal: 20},
})``;

export const Footer = styled.View`
  height: 10px;
`;
