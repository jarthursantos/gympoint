import React, { useState, useEffect } from 'react';
import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';

import { Form, Textarea } from '@rocketseat/unform';
import * as Yup from 'yup';

import Modal from '~/components/Modal';
import api from '~/services/api';
import EventManager from '~/services/eventManager';

import { Content } from './styles';

const manager = new EventManager();

export const displayAnswerDialog = (id, question, callback) => {
  manager.emit('answer', id, question, callback);
};

export default function AnswerDialog() {
  const [opened, setOpened] = useState(false);
  const [question, setQuestion] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    manager.on('answer', (id, content, callback) => {
      setQuestion({ id, content, callback });
      setOpened(true);
    });

    return () => manager.off('answer');
  }, [question]);

  function handleClose() {
    setOpened(false);
    setIsLoading(false);
  }

  function handleSubmit(data) {
    const { id } = question;
    setIsLoading(true);

    api
      .post(`/help-orders/${id}/answer`, data)
      .then(() => {
        handleClose();

        const { callback } = question;

        if (callback) callback();
      })
      .catch(err => {
        if (err.response) {
          toast.error(err.response.data.error);
        } else {
          toast.error(
            'Ocorreu um erro ao tentar se comunicar com o servidor, favor tentar novamente mais tarde'
          );
        }

        setIsLoading(false);
      });
  }

  const schema = Yup.object().shape({
    answer: Yup.string()
      .max(1024, 'A resposta deve possuir no máximo 1024 caracteres')
      .required('A resposta não pode ser vázia'),
  });

  return (
    <Modal isOpen={opened} onRequestClose={handleClose}>
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
