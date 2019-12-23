import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdSearch } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { differenceInYears, parseISO } from 'date-fns';

import api from '~/services/api';
import { navigate } from '~/store/modules/navigation/actions';

import Table from '~/components/Table';
import TopBar from '~/components/TopBar';
import EmptyState from '~/components/EmptyState';
import LoadingState from '~/components/LoadingState';
import RegisterButton from '~/components/RegisterButton';
import { Wrapper, Container } from './styles';

export default function StudentList() {
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(navigate('students'));
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await api.get('/students');

      const data = response.data.map(student => ({
        ...student,
        age: differenceInYears(new Date(), parseISO(student.birthdate)),
      }));

      setStudents(data);
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    const lowerFilter = filter.toLowerCase().trim();

    setFilteredStudents(
      students.filter(({ name }) => name.toLowerCase().includes(lowerFilter))
    );
  }, [filter, students]);

  function RenderCurrentState() {
    if (isLoading) return <LoadingState />;

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
              <td>{student.email}</td>
              <td className="fill centered">{student.age}</td>
              <td className="collapsing actions">
                <Link to={`/students/${student.id}/edit`} className="secondary">
                  editar
                </Link>
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
        <TopBar title="Gerenciando alunos">
          <RegisterButton to="/students/register" />

          <div>
            <MdSearch size={20} color="#999" />
            <input
              value={filter}
              onChange={e => setFilter(e.target.value)}
              type="text"
              placeholder="Buscar aluno"
            />
          </div>
        </TopBar>

        <RenderCurrentState />
      </Container>
    </Wrapper>
  );
}
