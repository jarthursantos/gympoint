import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import api from '~/services/api';
import { navigate } from '~/store/modules/navigation/actions';

import Table from '~/components/Table';
import TopBar from '~/components/TopBar';
import LoadingState from '~/components/States/Loading';
import RegisterButton from '~/components/RegisterButton';
import { Wrapper, Container } from './styles';

export default function PlanList() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(navigate('registrations'));
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await api.get('/registrations');

      setRegistrations(response.data);
      setLoading(false);
    })();
  }, []);

  function RegistrationTable() {
    return (
      <Table>
        <thead>
          <tr>
            <th>Aluno</th>
            <th className="centered">Plano</th>
            <th className="centered">Inicio</th>
            <th className="centered">Término</th>
            <th className="centered">Ativa</th>
            <th className="collapsing" />
          </tr>
        </thead>
        <tbody>
          {registrations.map(registration => (
            <tr key={registration.id}>
              <td>{registration.student.name}</td>
              <td className="fill centered">{registration.plan.title}</td>
              <td className="fill centered">
                {format(
                  parseISO(registration.start_date),
                  "dd 'de' MMMM 'de' yyyy",
                  {
                    locale: pt,
                  }
                )}
              </td>
              <td className="fill centered">
                {format(
                  parseISO(registration.end_date),
                  "dd 'de' MMMM 'de' yyyy",
                  {
                    locale: pt,
                  }
                )}
              </td>
              <td className="fill centered">
                {registration.active ? 'SIM' : 'NÃO'}
              </td>
              <td className="collapsing actions">
                <Link
                  to={`registrations/${registration.id}/edit`}
                  className="secondary"
                >
                  editar
                </Link>
                <button type="button" className="primary">
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
        <TopBar title="Gerenciando matrículas">
          <RegisterButton to="/registrations/register" />
        </TopBar>

        {loading ? <LoadingState /> : <RegistrationTable />}
      </Container>
    </Wrapper>
  );
}

// TODO: empty state
