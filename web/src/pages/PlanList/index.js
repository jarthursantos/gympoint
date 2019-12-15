import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import { useDispatch } from 'react-redux';

import api from '~/services/api';
import { navigate } from '~/store/modules/navigation/actions';
import { month as monthPlurals } from '~/util/plurals';
import { formatPrice } from '~/util/format';

import Table from '~/components/Table';
import TopBar from '~/components/TopBar';
import LoadingState from '~/components/States/Loading';
import { Wrapper, Container } from './styles';

export default function PlanList() {
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

  function handleDelete({ id, title }) {}

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
            <tr key={plan.id}>
              <td>{plan.title}</td>
              <td className="fill centered">{monthPlurals(plan.duration)}</td>
              <td className="fill centered">{formatPrice(plan.price)}</td>
              <td className="collapsing actions">
                <Link to={`/plans/${plan.id}/edit`} className="secondary">
                  editar
                </Link>
                <button
                  onClick={() => handleDelete(plan)}
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
      <Container>
        <TopBar title="Gerenciando planos">
          <Link to="/plans/register" className="primary">
            <MdAdd size={20} color="#fff" />
            Cadastrar
          </Link>
        </TopBar>
        {loading ? <LoadingState /> : <PlanTable />}
      </Container>
    </Wrapper>
  );
}

// TODO: README.md with "responsive layout has not implemented"

// TODO: Loading empty state
