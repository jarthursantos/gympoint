import React, { useState, useEffect } from 'react';
import ReactLoading from 'react-loading';

import EventManager from '~/services/eventManager';

import Modal from '~/components/Modal';
import { Content, Actions } from './styles';

const manager = new EventManager();

export const displayDeleteDialog = (message, callback) => {
  manager.emit('delete', message, callback);
};

export default function DeleteDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState(null);
  const [callback, setCallback] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    manager.on('delete', (message, eventCallback) => {
      setCallback({
        handler: eventCallback,
      });
      setContent(message);
      setIsOpen(true);
    });

    return () => manager.off('delete');
  }, [content]);

  function handleClose() {
    setIsOpen(false);
    setIsLoading(false);
    setContent(null);
    setCallback({});
  }

  async function handleDelete() {
    setIsLoading(true);
    await callback.handler();

    handleClose();
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={handleClose}>
      <Content>{content}</Content>
      <Actions>
        <button className="secondary" type="button" onClick={handleClose}>
          Cancelar
        </button>
        <button className="primary" type="button" onClick={handleDelete}>
          {isLoading ? (
            <ReactLoading type="spin" color="#fff" height={20} width={20} />
          ) : (
            'Confirmar'
          )}
        </button>
      </Actions>
    </Modal>
  );
}
