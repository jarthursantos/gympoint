import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import EmptyState from '~/components/EmptyState';
import ErrorState from '~/components/ErrorState';
import LoadingState from '~/components/LoadingState';
import Table from '~/components/Table';
import TopBar from '~/components/TopBar';
import api from '~/services/api';

import AnswerButton from './AnswerButton';
import AnswerDialog from './AnswerDialog';
import { Wrapper, Container } from './styles';

export default function HelpOrderList() {
  const [opened, setOpened] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [helpOrder, setHelpOrder] = useState({});
  const [helpOrders, setHelpOrders] = useState([]);
  const [loadingError, setLoadingError] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      try {
        const response = await api.get('/help-orders');

        const data = response.data.map(item => ({
          ...item,
          createdAtFormated: format(
            parseISO(item.created_at),
            "dd 'de' MMMM 'de' yyyy",
            {
              locale: pt,
            }
          ),
        }));

        setHelpOrders(data);
      } catch (err) {
        setLoadingError(true);
      }

      setIsLoading(false);
    })();
  }, []);

  function handleAction(item) {
    setHelpOrder(item);
    setOpened(true);
  }

  function handleClose() {
    setSaving(false);
    setOpened(false);
    setHelpOrder({});
  }

  function handleSubmit(data) {
    const { id } = helpOrder;
    setSaving(true);

    api
      .post(`/help-orders/${id}/answer`, data)
      .then(() => {
        handleClose();

        setHelpOrders(helpOrders.filter(item => item.id !== id));
      })
      .catch(err => {
        if (err.response) {
          toast.error(err.response.data.error);
        } else {
          toast.error(
            'Ocorreu um erro ao tentar se comunicar com o servidor, favor tentar novamente mais tarde'
          );
        }

        handleClose();
        setSaving(false);
      });
  }

  return (
    <>
      <Wrapper>
        <TopBar title="Pedidos de auxílio" />

        <Container>
          {(() => {
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
                  {helpOrders.map(item => (
                    <tr key={item.id}>
                      <td>{item.student.name}</td>
                      <td className="fill centered">
                        {item.createdAtFormated}
                      </td>
                      <td className="collapsing actions">
                        <AnswerButton onClick={() => handleAction(item)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            );
          })()}
        </Container>
      </Wrapper>

      <AnswerDialog
        isOpen={opened}
        isLoading={saving}
        onSubmit={handleSubmit}
        onRequestClose={handleClose}
        question={helpOrder.question}
      />
    </>
  );
}
