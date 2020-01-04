import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;

  background: #fff;
  padding: 0 30px;
`;

export const Logo = styled.Image`
  align-self: center;
  margin-bottom: 20px;
`;

export const CodeInput = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})`
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  height: 45px;
  margin-bottom: 15px;
  padding: 0 20px;
`;
