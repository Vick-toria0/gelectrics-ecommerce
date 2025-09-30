import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const NotificationContext = createContext();

export const useNotifications = () => {
  return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load notifications from localStorage or API
  useEffect(() => {
    if (currentUser) {
      const savedNotifications = localStorage.getItem(`notifications_${currentUser.uid}`);
      if (savedNotifications) {
        setNotifications(JSON.parse(savedNotifications));
      }
    }
    setLoading(false);
  }, [currentUser]);

  // Save notifications to localStorage when they change
  useEffect(() => {
    if (currentUser && !loading) {
      localStorage.setItem(
        `notifications_${currentUser.uid}`,
        JSON.stringify(notifications)
      );
    }
  }, [notifications, currentUser, loading]);

  const addNotification = (productId, type, data = {}) => {
    const newNotification = {
      id: Date.now().toString(),
      productId,
      type,
      createdAt: new Date().toISOString(),
      read: false,
      ...data
    };

    setNotifications(prev => [newNotification, ...prev]);
    return newNotification;
  };

  const markAsRead = (notificationId) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const removeNotification = (notificationId) => {
    setNotifications(prev =>
      prev.filter(notification => notification.id !== notificationId)
    );
  };

  const getProductNotifications = (productId) => {
    return notifications.filter(n => n.productId === productId);
  };

  // Check if user has a notification for a specific product and type
  const hasNotification = (productId, type) => {
    return notifications.some(
      n => n.productId === productId && n.type === type && !n.fulfilled
    );
  };

  const value = {
    notifications,
    loading,
    addNotification,
    markAsRead,
    removeNotification,
    getProductNotifications,
    hasNotification
  };

  return (
    <NotificationContext.Provider value={value}>
      {!loading && children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
