import React from 'react';

import { Form, Input } from '@rocketseat/unform';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import ActivityIndicator from '~/components/ActivityIndicator';
import Modal from '~/components/Modal';

import { Content } from './styles';

export default function AnswerDialog({
  isOpen,
  question,
  isLoading,
  onSubmit,
  ...rest
}) {
  const schema = Yup.object().shape({
    answer: Yup.string()
      .max(1024, 'A resposta deve possuir no máximo 1024 caracteres')
      .required('A resposta não pode ser vázia'),
  });

  return (
    <Modal isOpen={isOpen} {...rest}>
      <Content>
        <strong>Pergunta do Aluno</strong>
        <p>{question}</p>
        <strong>Sua Resposta</strong>
        <Form schema={schema} onSubmit={onSubmit}>
          <Input multiline name="answer" rows="6" />
          <button type="submit" onClick={() => {}}>
            {isLoading ? <ActivityIndicator /> : 'Responder Aluno'}
          </button>
        </Form>
      </Content>
    </Modal>
  );
}

AnswerDialog.propTypes = {
  isOpen: PropTypes.bool,
  question: PropTypes.string,
  isLoading: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
};

AnswerDialog.defaultProps = {
  isOpen: false,
  isLoading: false,
  question: null,
};
