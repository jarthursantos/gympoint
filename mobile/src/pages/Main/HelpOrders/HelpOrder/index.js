import React from 'react';

import {parseISO, formatDistance} from 'date-fns';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';

import {
  Container,
  Header,
  TitleContainer,
  Icon,
  Title,
  AskDate,
  Ask,
} from './styles';

export default function HelpOrder({data, ...rest}) {
  return (
    <Container enabled={!!data.answer} {...rest}>
      <Header>
        <TitleContainer>
          <Icon answered={!!data.answer} />
          <Title answered={!!data.answer}>
            {data.answer ? 'Respondido' : 'Sem resposta'}
          </Title>
        </TitleContainer>
        <AskDate>
          {formatDistance(parseISO(data.created_at), new Date(), {
            addSuffix: true,
            locale: pt,
          })}
        </AskDate>
      </Header>
      <Ask>{data.question}</Ask>
    </Container>
  );
}

HelpOrder.propTypes = {
  data: PropTypes.shape({
    answer: PropTypes.string,
    question: PropTypes.string.isRequired,
    created_at: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ]).isRequired,
  }).isRequired,
};
