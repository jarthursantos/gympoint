import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { MdNotifications } from 'react-icons/md';
import { parseISO, formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import api from '~/services/api';

import {
  Container,
  Badge,
  NotificationList,
  Scroll,
  Notification,
} from './styles';

export default function Notifications() {
  const [visible, setVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const hasNotification = useMemo(() => notifications.length, [notifications]);

  const handleCloseNotifications = useCallback(() => {
    if (visible) setVisible(false);
  }, [visible]);

  useEffect(() => {
    (async () => {
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
    })();

    document.addEventListener('mouseup', handleCloseNotifications);

    return () => {
      document.removeEventListener('mouseup', handleCloseNotifications);
    };
  }, [handleCloseNotifications]);

  function handleToggleVisible() {
    setVisible(!visible);
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
              <Notification key={notification._id}>
                <span>{notification.title}</span>
                <p>{notification.message}</p>
                <time>{notification.timeDistance}</time>
              </Notification>
            ))}
          </Scroll>
        ) : (
          <p className="empty-message">Você não tem notificações.</p>
        )}
      </NotificationList>
    </Container>
  );
}

// TODO: notification action
// TODO: loading state
