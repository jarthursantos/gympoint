import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { MdNotifications } from 'react-icons/md';
import { parseISO, formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import ReactLoading from 'react-loading';

import api from '~/services/api';
import { displayAnswerDialog } from '~/components/AnswerDialog';

import {
  Container,
  Badge,
  NotificationList,
  Scroll,
  Notification,
} from './styles';

export default function Notifications() {
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const hasNotification = useMemo(() => notifications.length, [notifications]);

  const handleCloseNotifications = useCallback(() => {
    if (visible) setVisible(false);
  }, [visible]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await api.get('/notifications');

      const data = response.data.map(notification => ({
        ...notification,
        timeDistance: formatDistance(
          parseISO(notification.createdAt),
          new Date(),
          {
            addSuffix: true,
            locale: pt,
          }
        ),
      }));

      setNotifications(data);
      setIsLoading(false);
    })();

    document.addEventListener('mouseup', handleCloseNotifications);

    return () => {
      document.removeEventListener('mouseup', handleCloseNotifications);
    };
  }, [handleCloseNotifications]);

  function handleToggleVisible() {
    setVisible(!visible);
  }

  function handleAction({ help_order, question }) {
    displayAnswerDialog(help_order, question);
  }

  return (
    <Container>
      <Badge onClick={handleToggleVisible} hasNotification={hasNotification}>
        <MdNotifications size={20} color="#444" />
      </Badge>

      <NotificationList visible={visible}>
        {notifications.length ? (
          <Scroll>
            {notifications.map(notification => (
              <Notification
                key={notification._id}
                onClick={() => handleAction(notification)}
              >
                <span>{notification.title}</span>
                <p>{notification.message}</p>
                <time>{notification.timeDistance}</time>
              </Notification>
            ))}
          </Scroll>
        ) : (
          <div className="message-container">
            {isLoading ? (
              <>
                <ReactLoading type="spin" color="#fff" height={20} width={20} />
                <span>Carregando...</span>
              </>
            ) : (
              <p className="empty-message">Você não tem notificações.</p>
            )}
          </div>
        )}
      </NotificationList>
    </Container>
  );
}

// TODO: other notification type: asnwer avaliated
// TODO: add redux to notifications and help orders
