import React, { useRef, useState, useEffect } from 'react';
import { MdExpandMore, MdError } from 'react-icons/md';
import ReactLoading from 'react-loading';

import { useField } from '@rocketseat/unform';
import { differenceInYears, parseISO } from 'date-fns';
import PropTypes from 'prop-types';

import EmptyState from '~/components/EmptyState';
import Modal from '~/components/Modal';
import api from '~/services/api';

import {
  Container,
  ModalContent,
  SearchBar,
  StudentList,
  Student,
  Actions,
} from './styles';

export default function StudentPicker({ name }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'value',
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  const [opened, setOpened] = useState(false);
  const [filter, setFilter] = useState('');
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);

  const [selectedListItem, setSelectedListItem] = useState({});
  const [selectedStudent, setSelectedStudent] = useState(defaultValue);
  const [value, setValue] = useState(defaultValue && defaultValue.id);

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
        setFilteredStudents(data);
      } catch (err) {
        setLoadingError(true);
      }

      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (!defaultValue) return;

    setValue(defaultValue.id);
    setSelectedStudent(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    const lowerFilter = filter.toLowerCase().trim();

    const data = students.filter(({ name: studentName }) =>
      studentName.toLowerCase().includes(lowerFilter)
    );

    setFilteredStudents(data);

    setSelectedListItem(data.length === 1 ? data[0] : {});
  }, [filter, students]);

  function handleOpenModal() {
    if (isLoading || loadingError) return;

    setOpened(true);
  }

  function handleCloseModal() {
    setFilter('');
    setOpened(false);
    setSelectedListItem({});
  }

  function handleSelectListItem(student) {
    setSelectedListItem(selectedListItem.id === student.id ? {} : student);
  }

  function handleConfirmSelection() {
    setValue(selectedListItem.id);
    setSelectedStudent(selectedListItem);

    handleCloseModal();
  }

  function CurrentInputState() {
    if (loadingError) return <MdError size={24} color="#de3b3b" />;

    if (isLoading)
      return <ReactLoading type="spin" color="#666" height={24} width={24} />;

    return <MdExpandMore size={24} color="#666" />;
  }

  function CurrentState() {
    if (!students.length) return <EmptyState />;

    if (filter.length && !filteredStudents.length)
      return <EmptyState message="Sua busca não encontrou nada" />;

    return (
      <StudentList>
        {filteredStudents.map(student => (
          <Student
            key={student.id}
            selected={student.id === selectedListItem.id}
            onClick={() => handleSelectListItem(student)}
          >
            <div>
              <strong>{student.name}</strong>
              <small>{student.email}</small>
            </div>
            <span>{student.age} anos</span>
          </Student>
        ))}
      </StudentList>
    );
  }

  return (
    <>
      <Container onClick={handleOpenModal}>
        <span>
          {!selectedStudent ? 'Selecionar aluno' : selectedStudent.name}
        </span>
        <CurrentInputState />
        <input
          type="hidden"
          ref={ref}
          id={fieldName}
          name={fieldName}
          value={value || ''}
          onChange={setValue}
          defaultValue={defaultValue}
        />
      </Container>
      <Modal isOpen={opened} onRequestClose={() => setOpened(false)}>
        <ModalContent>
          <SearchBar
            value={filter}
            onChange={e => setFilter(e.target.value)}
            type="text"
            autoFocus
            placeholder="Buscar aluno"
          />
          <div className="content">
            <CurrentState />
          </div>
          <Actions>
            <button type="button" className="cancel" onClick={handleCloseModal}>
              Cancelar
            </button>
            <button
              type="submit"
              className="confirm"
              disabled={!selectedListItem.id}
              onClick={handleConfirmSelection}
            >
              Confirmar
            </button>
          </Actions>
        </ModalContent>
      </Modal>
      {error && <span>{error}</span>}
    </>
  );
}

StudentPicker.propTypes = {
  name: PropTypes.string.isRequired,
};
