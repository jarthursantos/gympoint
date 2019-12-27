import React, { useState, useEffect } from 'react';

import ActivityIndicator from '~/components/ActivityIndicator';
import Modal from '~/components/Modal';
import EventManager from '~/services/eventManager';

import { Content, Actions } from './styles';

const manager = new EventManager();

export const displayDeleteDialog = (message, callback) => {
  manager.emit('deleteCalled', message, callback);
};

export default function DeleteDialog() {
  const [opened, setOpened] = useState(false);
  const [content, setContent] = useState(null);
  const [callback, setCallback] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    manager.on('deleteCalled', (message, eventCallback) => {
      setCallback({
        handler: eventCallback,
      });

      setContent(message);
      setOpened(true);
    });

    return () => manager.off('deleteCalled');
  }, [content]);

  function handleClose() {
    setOpened(false);
    setIsLoading(false);
    setContent(null);
    setCallback({});
  }

  async function handleDelete() {
    setIsLoading(true);

    const { handler } = callback;
    if (handler) await handler();

    handleClose();
  }

  return (
    <Modal isOpen={opened} onRequestClose={handleClose}>
      <Content>{content}</Content>
      <Actions>
        <button className="secondary" type="button" onClick={handleClose}>
          Cancelar
        </button>
        <button className="primary" type="button" onClick={handleDelete}>
          {isLoading ? <ActivityIndicator /> : 'Confirmar'}
        </button>
      </Actions>
    </Modal>
  );
}
