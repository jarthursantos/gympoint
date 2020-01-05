import styled from 'styled-components/native';

export const Wrapper = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {padding: 20},
})`
  flex: 1;
  background: #f5f5f5;
`;

export const HelpOrder = styled.View`
  background: #fff;
  border-radius: 4px;
`;

export const Container = styled.View`
  padding: 20px;
`;

export const Header = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;

  margin-bottom: 16px;
`;

export const Title = styled.Text`
  color: #444;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
`;

export const AskDate = styled.Text`
  color: #666;
  font-size: 14px;
`;

export const Ask = styled.Text`
  color: #666;
  font-size: 14px;
  line-height: 26px;
`;

export const Answer = styled.Text`
  color: #666;
  font-size: 14px;
  line-height: 26px;
`;

export const Separator = styled.View`
  background: #f5f5f5;
  height: 1px;
`;

export const Avatar = styled.Image`
  border-radius: 18px;
  width: 36px;
  height: 36px;
  border: 1px solid #eee;
  background: #ccc;
`;

export const ReplierHeader = styled(Header)`
  align-items: flex-start;
`;

export const Replier = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ReplierInfo = styled.View`
  margin-left: 16px;
`;

export const ReplierName = styled.Text`
  color: #444;
  font-size: 14px;
  font-weight: bold;
`;

export const ReplyMessage = styled.Text`
  font-size: 12px;
  color: #999;
`;
