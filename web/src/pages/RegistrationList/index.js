import React, { useState, useEffect } from 'react';

import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

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

import { Wrapper, Container } from './styles';

export default function RegistrationList() {
  const [registrations, setRegistrations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      try {
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
      } catch (err) {
        setLoadingError(true);
      }

      setIsLoading(false);
    })();
  }, []);

  function handleDelete({ id, plan: { title }, student: { name } }) {
    displayDeleteDialog(
      <>
        Deseja cancelar a matrícula do(a) aluno(a) &quot;<strong>{name}</strong>
        &quot; no plano &quot;<strong>{title}</strong>&quot;?
      </>,
      async () => {
        await api.delete(`/registrations/${id}`);

        setRegistrations(
          registrations.filter(registration => registration.id !== id)
        );
      }
    );
  }

  return (
    <Wrapper>
      <TopBar title="Gerenciando matrículas">
        <RegisterButton to="/registrations/register" />
      </TopBar>

      <Container>
        {(() => {
          if (loadingError) return <ErrorState />;

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
                    <td className="fill centered">
                      {registration.plan ? registration.plan.title : '-'}
                    </td>
                    <td className="fill centered">
                      {registration.startDateFormated}
                    </td>
                    <td className="fill centered">
                      {registration.endDateFormated}
                    </td>
                    <td className="fill centered">
                      {registration.active ? 'SIM' : 'NÃO'}
                    </td>
                    <td className="collapsing actions">
                      <EditButton
                        to={`registrations/${registration.id}/edit`}
                      />
                      <DeleteButton
                        onClick={() => handleDelete(registration)}
                      />
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
