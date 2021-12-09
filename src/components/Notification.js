import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  const alerts = {
    success: 'success',
    error: 'danger',
  };

  return !notification.message ? null : (
    <div className="container">
      <div
        className={`alert alert-${alerts[notification.notifType]}`}
        role="alert"
      >
        {notification.message}
      </div>
    </div>
  );
};

export default Notification;
