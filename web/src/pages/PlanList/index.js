import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import api from '~/services/api';
import { navigate } from '~/store/modules/navigation/actions';
import { month as monthPlurals } from '~/util/plurals';
import { formatPrice } from '~/util/format';

import Table from '~/components/Table';
import TopBar from '~/components/TopBar';
import EmptyState from '~/components/EmptyState';
import LoadingState from '~/components/LoadingState';
import RegisterButton from '~/components/RegisterButton';
import DeleteButton from '~/components/DeleteButton';
import EditButton from '~/components/EditButton';
import { displayDeleteDialog } from '~/components/DeleteDialog';
import { Wrapper, Container } from './styles';

export default function PlanList() {
  const [plans, setPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(navigate('plans'));
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await api.get('/plans');

      setPlans(response.data);
      setIsLoading(false);
    })();
  }, []);

  function handleDelete({ id, title }) {
    displayDeleteDialog(
      <>
        Deseja remover o aluno &quot;<strong>{title}</strong>&quot;?
      </>,
      async () => {
        await api.delete(`/plans/${id}`);

        setPlans(plans.filter(plan => plan.id !== id));
      }
    );
  }

  function CurrentState() {
    if (isLoading) return <LoadingState />;

    if (!plans.length) return <EmptyState />;

    return (
      <Table>
        <thead>
          <tr>
            <th>Título</th>
            <th className="centered">Duração</th>
            <th className="centered">Valor p/ Mês</th>
            <th className="collapsing" />
          </tr>
        </thead>
        <tbody>
          {plans.map(plan => (
            <tr key={plan.id}>
              <td>
                <div>{plan.title}</div>
              </td>
              <td className="fill centered">{monthPlurals(plan.duration)}</td>
              <td className="fill centered">{formatPrice(plan.price)}</td>
              <td className="collapsing">
                <EditButton to={`/plans/${plan.id}/edit`} />
                <DeleteButton onClick={() => handleDelete(plan)} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }

  return (
    <Wrapper>
      <TopBar title="Gerenciando planos">
        <RegisterButton to="/plans/register" />
      </TopBar>
      <Container>
        <CurrentState />
      </Container>
    </Wrapper>
  );
}
