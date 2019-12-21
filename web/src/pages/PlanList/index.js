import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import api from '~/services/api';
import { navigate } from '~/store/modules/navigation/actions';
import { month as monthPlurals } from '~/util/plurals';
import { formatPrice } from '~/util/format';

import ConfirmDialog from '~/components/ConfirmDialog';
import Table from '~/components/Table';
import TopBar from '~/components/TopBar';
import LoadingState from '~/components/States/Loading';
import RegisterButton from '~/components/RegisterButton';
import { Wrapper, Container, DialogContent } from './styles';

export default function PlanList() {
  const [planToCancel, setPlanToCancel] = useState(null);
  const [cancelingPlan, setCancelingPlan] = useState(false);

  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(navigate('plans'));
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await api.get('/plans');

      setPlans(response.data);
      setLoading(false);
    })();
  }, []);

  function handleDelete({ id, title }) {
    setPlanToCancel({ id, title });
  }

  async function handleConfirmDelete() {
    setCancelingPlan(true);

    await api.delete(`/plans/${planToCancel.id}`);

    setPlans(
      plans.map(plan => ({
        ...plan,
        deprecated: plan.id === planToCancel.id,
      }))
    );

    setPlanToCancel(null);
    setCancelingPlan(false);
  }

  function PlanTable() {
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
            <tr key={plan.id} className={plan.deprecated && 'deprecated'}>
              <td>
                <div>
                  {plan.title}
                  {plan.deprecated && <small>descontinuado</small>}
                </div>
              </td>
              <td className="fill centered">{monthPlurals(plan.duration)}</td>
              <td className="fill centered">{formatPrice(plan.price)}</td>
              <td className="collapsing actions">
                <Link
                  to={!plan.deprecated && `/plans/${plan.id}/edit`}
                  className="secondary"
                >
                  editar
                </Link>
                <button
                  onClick={() => !plan.deprecated && handleDelete(plan)}
                  type="button"
                  className="primary"
                >
                  apagar
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
      <ConfirmDialog
        isOpen={!!planToCancel}
        isLoading={cancelingPlan}
        onConfirm={handleConfirmDelete}
        onCancel={() => !cancelingPlan && setPlanToCancel(null)}
        onRequestClose={() => !cancelingPlan && setPlanToCancel(null)}
      >
        <DialogContent>
          Deseja apagar o plano{' '}
          <strong>&ldquo;{planToCancel && planToCancel.title}&rdquo;</strong> ?
        </DialogContent>
      </ConfirmDialog>

      <Container>
        <TopBar title="Gerenciando planos">
          <RegisterButton to="/plans/register" />
        </TopBar>
        {loading ? <LoadingState /> : <PlanTable />}
      </Container>
    </Wrapper>
  );
}

// TODO: empty state
