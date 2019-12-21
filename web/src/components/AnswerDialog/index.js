import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import ReactLoading from 'react-loading';
import { Form, Textarea } from '@rocketseat/unform';
import { toast } from 'react-toastify';

import api from '~/services/api';
import EventManager from '~/services/eventManager';

import Modal from '~/components/Modal';
import { Content } from './styles';

const manager = new EventManager();

export const displayAnswerDialog = (id, question) => {
  manager.emit('answer', id, question);
};

export default function AnswerDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    manager.on('answer', (id, content) => {
      setQuestion({ id, content });
      setIsOpen(true);
    });

    return () => manager.off('answer');
  }, [question]);

  function handleClose() {
    setIsOpen(false);
    setIsLoading(false);
  }

  function handleSubmit(data) {
    const { id } = question;
    setIsLoading(true);

    api
      .post(`/help-orders/${id}/answer`, data)
      .then(() => {
        handleClose();
      })
      .catch(err => {
        toast.error(err.response.data.error);
        setIsLoading(false);
      });
  }

  const schema = Yup.object().shape({
    answer: Yup.string()
      .max(1024, 'A resposta deve possuir no máximo 1024 caracteres')
      .required('A resposta não pode ser vázia'),
  });

  return (
    <Modal isOpen={isOpen} onRequestClose={handleClose}>
      <Content>
        <strong>Pergunta do Aluno</strong>
        <p>{question.content}</p>
        <strong>Sua Resposta</strong>
        <Form schema={schema} onSubmit={handleSubmit}>
          <Textarea name="answer" placeholder="Informe sua resposta" rows="6" />
          <button type="submit" onClick={() => {}}>
            {isLoading ? (
              <ReactLoading type="spin" color="#fff" height={20} width={20} />
            ) : (
              'Responder Aluno'
            )}
          </button>
        </Form>
      </Content>
    </Modal>
  );
}

// TODO: ask to close
