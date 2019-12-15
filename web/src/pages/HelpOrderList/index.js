import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import api from '~/services/api';
import { navigate } from '~/store/modules/navigation/actions';

import Table from '~/components/Table';
import TopBar from '~/components/TopBar';
import LoadingState from '~/components/States/Loading';
import { Wrapper, Container } from './styles';

export default function HelpOrderList() {
  const [helpOrders, setHelpOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(navigate('helpOrders'));
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await api.get('/help-orders');

      setHelpOrders(response.data);
      setLoading(false);
    })();
  }, []);

  function renderTable() {
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
                <button type="button" className="secondary">
                  responder
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }

  return (
    <Wrapper>
      <Container>
        <TopBar title="Pedidos de auxílio" />

        {loading ? <LoadingState /> : renderTable()}
      </Container>
    </Wrapper>
  );
}

// TODO: README.md with "responsive layout has not implemented"

// TODO: Loading empty state
