import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdArrowBack, MdSave } from 'react-icons/md';
import { useDispatch } from 'react-redux';

import api from '~/services/api';
import { navigate } from '~/store/modules/navigation/actions';

import TopBar from '~/components/TopBar';
import { Wrapper, Container } from './styles';

export default function StudentRegister() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(navigate('students'));
  }, [dispatch]);

  return (
    <Wrapper>
      <Container>
        <TopBar title="Cadastrar aluno">
          <Link to="/students" className="secondary">
            <MdArrowBack size={20} color="#fff" />
            Voltar
          </Link>
          <button className="primary" type="button">
            <MdSave size={20} color="#fff" />
            Salvar
          </button>
        </TopBar>
      </Container>
    </Wrapper>
  );
}
