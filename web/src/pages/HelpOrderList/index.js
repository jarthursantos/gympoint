import React, { useState, useEffect } from 'react';

import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import { displayAnswerDialog } from '~/components/AnswerDialog';
import EmptyState from '~/components/EmptyState';
import ErrorState from '~/components/ErrorState';
import LoadingState from '~/components/LoadingState';
import Table from '~/components/Table';
import TopBar from '~/components/TopBar';
import api from '~/services/api';

import AnswerButton from './AnswerButton';
import { Wrapper, Container } from './styles';

export default function HelpOrderList() {
  const [helpOrders, setHelpOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      try {
        const response = await api.get('/help-orders');

        setHelpOrders(response.data);
      } catch (err) {
        setLoadingError(true);
      }

      setIsLoading(false);
    })();
  }, []);

  function handleAction({ id, question }) {
    displayAnswerDialog(id, question, () => {
      setHelpOrders(helpOrders.filter(helpOrder => helpOrder.id !== id));
    });
  }

  function CurrentState() {
    if (loadingError) return <ErrorState />;

    if (isLoading) return <LoadingState />;

    if (!helpOrders.length) return <EmptyState />;

    return (
      <Table>
        <thead>
          <tr>
            <th>Aluno</th>
            <th className="centered">Feita em</th>
            <th className="collapsing" />
          </tr>
        </thead>
        <tbody>
          {helpOrders.map(helpOrder => (
            <tr key={helpOrder.id}>
              <td>{helpOrder.student.name}</td>
              <td className="fill centered">
                {format(
                  parseISO(helpOrder.created_at),
                  "dd 'de' MMMM 'de' yyyy",
                  {
                    locale: pt,
                  }
                )}
              </td>
              <td className="collapsing actions">
                <AnswerButton onClick={() => handleAction(helpOrder)} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }

  return (
    <Wrapper>
      <TopBar title="Pedidos de auxílio" />

      <Container>
        <CurrentState />
      </Container>
    </Wrapper>
  );
}
