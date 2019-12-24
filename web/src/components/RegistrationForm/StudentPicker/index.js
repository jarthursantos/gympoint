import React, { useRef, useState, useEffect } from 'react';
import { MdArrowForward } from 'react-icons/md';
import ReactLoading from 'react-loading';

import { useField } from '@rocketseat/unform';
import { differenceInYears, parseISO } from 'date-fns';
import PropTypes from 'prop-types';

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

  const [isOpen, setIsOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [selected, setSelected] = useState({});
  const [selectedStudent, setSelectedStudent] = useState(defaultValue);
  const [value, setValue] = useState(defaultValue && defaultValue.id);
  const [isLoading, setIsLoading] = useState(false);

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

  function handleOpen() {
    if (isLoading) return;

    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
    setSelected({});
  }

  function handleSelect(student) {
    if (selected.id === student.id) setSelected({ student });
    else setSelected(student);
  }

  function handleConfirmSelection() {
    setSelectedStudent(selected);
    setValue(selected.id);
    handleClose();
  }

  return (
    <>
      <Container onClick={handleOpen}>
        <span>
          {!selectedStudent ? 'Selecionar aluno' : selectedStudent.name}
        </span>
        {isLoading ? (
          <ReactLoading type="spin" color="#666" height={24} width={24} />
        ) : (
          <MdArrowForward size={24} color="#666" />
        )}
        <input
          type="hidden"
          ref={ref}
          id={fieldName}
          name={fieldName}
          value={value}
          defaultValue={defaultValue}
        />
      </Container>
      <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
        <ModalContent>
          <SearchBar type="text" placeholder="Buscar aluno" />
          <StudentList>
            {students.map(student => (
              <Student
                key={student.id}
                selected={student.id === selected.id}
                onClick={() => handleSelect(student)}
              >
                <div>
                  <strong>{student.name}</strong>
                  <small>{student.email}</small>
                </div>
                <span>{student.age} anos</span>
              </Student>
            ))}
          </StudentList>
          <Actions>
            <button type="button" className="cancel" onClick={handleClose}>
              Cancelar
            </button>
            <button
              type="button"
              className="confirm"
              disabled={!selected.id}
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

// TODO: improve usability with keyboard
