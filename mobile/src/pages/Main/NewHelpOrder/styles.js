import styled from 'styled-components/native';

export const Wrapper = styled.View`
  flex: 1;
  background: #f5f5f5;
  padding: 20px;
`;

export const Container = styled.View`
  border-radius: 4px;
  background: #fff;
  height: 300px;

  margin-bottom: 20px;
`;

export const TextArea = styled.TextInput.attrs({
  multilines: true,
})`
  padding: 15px 20px;
  line-height: 26px;
`;
