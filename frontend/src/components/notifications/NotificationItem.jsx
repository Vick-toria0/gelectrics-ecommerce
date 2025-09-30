import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const NotificationItem = ({ notification, onClick, onDismiss }) => {
  const getNotificationIcon = () => {
    switch (notification.type) {
      case 'backInStock':
        return (
          <div className="flex-shrink-0 pt-0.5">
            <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        );
      case 'priceDrop':
        return (
          <div className="flex-shrink-0">
            <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
            </svg>
          </div>
        );
      case 'preOrder':
        return (
          <div className="flex-shrink-0">
            <svg className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  const getNotificationMessage = () => {
    switch (notification.type) {
      case 'backInStock':
        return `${notification.productName} is back in stock!`;
      case 'priceDrop':
        return `Price dropped for ${notification.productName}! Now $${notification.newPrice}`;
      case 'preOrder':
        return `Pre-order now available for ${notification.productName}!`;
      default:
        return 'New notification';
    }
  };

  return (
    <li
      onClick={onClick}
      className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${!notification.read ? 'bg-blue-50' : 'bg-white'}`}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 pt-0.5">
          {getNotificationIcon()}
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium text-gray-900">
            {getNotificationMessage()}
          </p>
          <p className="mt-1 text-sm text-gray-500">
            {new Date(notification.createdAt).toLocaleString()}
          </p>
        </div>
        <div className="ml-4 flex-shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDismiss(e);
            }}
            className="inline-flex text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Dismiss</span>
            <XMarkIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </li>
  );
};

export default NotificationItem;
