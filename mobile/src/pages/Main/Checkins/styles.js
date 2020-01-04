import styled from 'styled-components/native';

import BaseButton from '~/components/Button';

export const Container = styled.SafeAreaView`
  background-color: #f5f5f5;
  flex: 1;
`;

export const Button = styled(BaseButton)`
  margin: 20px;
`;

export const CheckinList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {paddingHorizontal: 20},
})``;

export const Checkin = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  background: #fff;
  border-radius: 4px;
  margin-bottom: 10px;
  padding: 15px 20px;
`;

export const CheckinTitle = styled.Text`
  color: #444;
  font-size: 14px;
  font-weight: bold;
`;

export const CheckinDate = styled.Text`
  color: #666;
  font-size: 14px;
`;

export const Footer = styled.View`
  height: 10px;
`;
