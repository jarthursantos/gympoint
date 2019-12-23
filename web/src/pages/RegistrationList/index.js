import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import api from '~/services/api';
import { navigate } from '~/store/modules/navigation/actions';

import Table from '~/components/Table';
import TopBar from '~/components/TopBar';
import EmptyState from '~/components/EmptyState';
import LoadingState from '~/components/LoadingState';
import RegisterButton from '~/components/RegisterButton';
import { Wrapper, Container } from './styles';

export default function RegistrationList() {
  const [registrations, setRegistrations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(navigate('registrations'));
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await api.get('/registrations');

      const data = response.data.map(registration => ({
        ...registration,
        startDateFormated: format(
          parseISO(registration.start_date),
          "dd 'de' MMMM 'de' yyyy",
          {
            locale: pt,
          }
        ),
        endDateFormated: format(
          parseISO(registration.end_date),
          "dd 'de' MMMM 'de' yyyy",
          {
            locale: pt,
          }
        ),
      }));

      setRegistrations(data);
      setIsLoading(false);
    })();
  }, []);

  function CurrentState() {
    if (isLoading) return <LoadingState />;

    if (!registrations.length) return <EmptyState />;

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
                {registration.startDateFormated}
              </td>
              <td className="fill centered">{registration.endDateFormated}</td>
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
      <TopBar title="Gerenciando matrículas">
        <RegisterButton to="/registrations/register" />
      </TopBar>

      <Container>
        <CurrentState />
      </Container>
    </Wrapper>
  );
}
