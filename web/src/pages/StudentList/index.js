import React, { useState, useEffect } from 'react';

import { differenceInYears, parseISO } from 'date-fns';

import EditButton from '~/components/EditButton';
import EmptyState from '~/components/EmptyState';
import ErrorState from '~/components/ErrorState';
import LoadingState from '~/components/LoadingState';
import RegisterButton from '~/components/RegisterButton';
import Table from '~/components/Table';
import TopBar from '~/components/TopBar';
import api from '~/services/api';

import MailButton from './MailButton';
import SearchBar from './SearchBar';
import { Wrapper, Container } from './styles';

export default function StudentList() {
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const response = await api.get('/students');

        const data = response.data.map(student => ({
          ...student,
          age: differenceInYears(new Date(), parseISO(student.birthdate)),
        }));

        setStudents(data);
      } catch (err) {
        setLoadingError(true);
      }
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    const lowerFilter = filter.toLowerCase().trim();

    setFilteredStudents(
      students.filter(({ name }) => name.toLowerCase().includes(lowerFilter))
    );
  }, [filter, students]);

  return (
    <Wrapper>
      <TopBar title="Gerenciando alunos">
        <RegisterButton to="/students/register" />
        <SearchBar value={filter} onChange={e => setFilter(e.target.value)} />
      </TopBar>

      <Container>
        {(() => {
          if (loadingError) return <ErrorState />;

          if (isLoading) return <LoadingState />;

          if (filter.length && !filteredStudents.length)
            return <EmptyState message="Sua busca não encontrou nada" />;

          if (!students.length) return <EmptyState />;

          return (
            <Table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>E-Mail</th>
                  <th className="centered">Idade</th>
                  <th className="collapsing" />
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map(student => (
                  <tr key={student.id}>
                    <td>{student.name}</td>
                    <td>
                      <MailButton mail={student.email} />
                    </td>
                    <td className="fill centered">{student.age}</td>
                    <td className="collapsing actions">
                      <EditButton to={`/students/${student.id}/edit`} />
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
