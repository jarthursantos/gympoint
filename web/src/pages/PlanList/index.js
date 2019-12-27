import React, { useState, useEffect } from 'react';

import DeleteButton from '~/components/DeleteButton';
import { displayDeleteDialog } from '~/components/DeleteDialog';
import EditButton from '~/components/EditButton';
import EmptyState from '~/components/EmptyState';
import ErrorState from '~/components/ErrorState';
import LoadingState from '~/components/LoadingState';
import RegisterButton from '~/components/RegisterButton';
import Table from '~/components/Table';
import TopBar from '~/components/TopBar';
import api from '~/services/api';
import { formatPrice } from '~/util/format';
import { month as monthPlurals } from '~/util/plurals';

import { Wrapper, Container } from './styles';

export default function PlanList() {
  const [plans, setPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      try {
        const response = await api.get('/plans');

        const data = response.data.map(plan => ({
          ...plan,
          months: monthPlurals(plan.duration),
          formatedPrice: formatPrice(plan.price),
        }));

        setPlans(data);
      } catch (err) {
        setLoadingError(true);
      }

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

  return (
    <Wrapper>
      <TopBar title="Gerenciando planos">
        <RegisterButton to="/plans/register" />
      </TopBar>
      <Container>
        {(() => {
          if (loadingError) return <ErrorState />;

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
                    <td className="fill centered">{plan.months}</td>
                    <td className="fill centered">{plan.formatedPrice}</td>
                    <td className="collapsing">
                      <EditButton to={`/plans/${plan.id}/edit`} />
                      <DeleteButton onClick={() => handleDelete(plan)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          );
        })()}
      </Container>
    </Wrapper>
  );
}
