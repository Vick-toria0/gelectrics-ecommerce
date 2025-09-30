import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '../../contexts/NotificationContext';
import NotificationItem from './NotificationItem';

const NotificationList = ({ onClose }) => {
  const { notifications, markAsRead, removeNotification } = useNotifications();
  const navigate = useNavigate();

  const handleNotificationClick = (notification) => {
    markAsRead(notification.id);
    navigate(`/products/${notification.productId}`);
    onClose?.();
  };

  const handleDismiss = (e, notificationId) => {
    e.stopPropagation();
    removeNotification(notificationId);
  };

  if (notifications.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No notifications yet
      </div>
    );
  }

  return (
    <div className="max-h-96 overflow-y-auto">
      <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
          <button
            onClick={() => {
              notifications.forEach(n => markAsRead(n.id));
            }}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Mark all as read
          </button>
        </div>
      </div>
      <ul className="divide-y divide-gray-200">
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onClick={() => handleNotificationClick(notification)}
            onDismiss={(e) => handleDismiss(e, notification.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default NotificationList;
