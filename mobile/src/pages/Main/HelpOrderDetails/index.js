import React from 'react';

import {parseISO, formatDistance} from 'date-fns';
import pt from 'date-fns/locale/pt';

import {
  Wrapper,
  HelpOrder,
  Container,
  Header,
  Title,
  AskDate,
  Ask,
  Answer,
  Separator,
  Avatar,
  ReplierHeader,
  Replier,
  ReplierInfo,
  ReplierName,
  ReplyMessage,
} from './styles';

export default function HelpOrderDetails({navigation}) {
  const helpOrder = navigation.getParam('helpOrder');

  return (
    <Wrapper>
      <HelpOrder>
        <Container>
          <Header>
            <Title>Pergunta</Title>
            <AskDate>
              {formatDistance(parseISO(helpOrder.created_at), new Date(), {
                addSuffix: true,
                locale: pt,
              })}
            </AskDate>
          </Header>
          <Ask>{helpOrder.question}</Ask>
        </Container>
        <Separator />
        <Container>
          <ReplierHeader>
            <Replier>
              <Avatar source={{uri: helpOrder.replier.avatar.url}} />
              <ReplierInfo>
                <ReplierName>{helpOrder.replier.name}</ReplierName>
                <ReplyMessage>respondeu sua pergunta</ReplyMessage>
              </ReplierInfo>
            </Replier>
            <AskDate>
              {formatDistance(parseISO(helpOrder.answer_at), new Date(), {
                addSuffix: true,
                locale: pt,
              })}
            </AskDate>
          </ReplierHeader>
          <Answer>{helpOrder.answer}</Answer>
        </Container>
      </HelpOrder>
    </Wrapper>
  );
}

// TODO: null avatar view
