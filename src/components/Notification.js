import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  return !notification.message ? null : (
    <div className={`notification ${notification.notifType}`}>
      {notification.message}
    </div>
  );
};

export default Notification;
