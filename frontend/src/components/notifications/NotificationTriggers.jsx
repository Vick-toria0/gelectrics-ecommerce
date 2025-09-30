import React, { useState } from 'react';
import { useNotifications } from '../../contexts/NotificationContext';
import { useAuth } from '../../contexts/AuthContext';
import { EnvelopeIcon, BellAlertIcon } from '@heroicons/react/24/outline';

const NotificationTriggers = ({ product }) => {
  const { currentUser } = useAuth();
  const { addNotification, hasNotification } = useNotifications();
  const [isSubscribed, setIsSubscribed] = useState({
    backInStock: hasNotification(product.id, 'backInStock'),
    priceDrop: hasNotification(product.id, 'priceDrop')
  });
  const [showForm, setShowForm] = useState(null);
  const [email, setEmail] = useState('');
  const [price, setPrice] = useState('');

  const handleBackInStock = (e) => {
    e.preventDefault();
    if (!email) return;
    
    addNotification(product.id, 'backInStock', {
      productName: product.name,
      email,
      originalPrice: product.price,
      productImage: product.image
    });
    
    setIsSubscribed(prev => ({ ...prev, backInStock: true }));
    setShowForm(null);
    setEmail('');
  };

  const handlePriceDrop = (e) => {
    e.preventDefault();
    if (!email || !price) return;
    
    addNotification(product.id, 'priceDrop', {
      productName: product.name,
      email,
      targetPrice: parseFloat(price),
      currentPrice: product.price,
      productImage: product.image
    });
    
    setIsSubscribed(prev => ({ ...prev, priceDrop: true }));
    setShowForm(null);
    setEmail('');
    setPrice('');
  };

  const handlePreOrder = (e) => {
    e.preventDefault();
    if (!email) return;
    
    addNotification(product.id, 'preOrder', {
      productName: product.name,
      email,
      price: product.price,
      productImage: product.image,
      expectedDate: product.expectedDate || 'Coming soon'
    });
    
    setShowForm(null);
    setEmail('');
  };

  if (!currentUser) {
    return (
      <div className="mt-4 text-sm text-gray-500">
        <p>Sign in to get notified about price drops and stock updates</p>
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-4">
      {/* Back in Stock Notification */}
      <div className="flex items-center">
        <BellAlertIcon className="h-5 w-5 text-gray-400 mr-2" />
        {!isSubscribed.backInStock ? (
          <button
            onClick={() => setShowForm('backInStock')}
            className="text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            Notify me when back in stock
          </button>
        ) : (
          <span className="text-sm text-green-600">You'll be notified when back in stock</span>
        )}
      </div>

      {/* Price Drop Notification */}
      <div className="flex items-center">
        <BellAlertIcon className="h-5 w-5 text-gray-400 mr-2" />
        {!isSubscribed.priceDrop ? (
          <button
            onClick={() => setShowForm('priceDrop')}
            className="text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            Notify me when price drops
          </button>
        ) : (
          <span className="text-sm text-green-600">You'll be notified of price drops</span>
        )}
      </div>

      {/* Pre-order Notification */}
      {product.expectedDate && (
        <div className="flex items-center">
          <BellAlertIcon className="h-5 w-5 text-gray-400 mr-2" />
          <button
            onClick={() => setShowForm('preOrder')}
            className="text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            Pre-order notification
          </button>
        </div>
      )}

      {/* Notification Forms */}
      {showForm === 'backInStock' && (
        <form onSubmit={handleBackInStock} className="mt-2 p-3 bg-gray-50 rounded-md">
          <div className="flex">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            />
            <button
              type="submit"
              className="ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Notify me
            </button>
          </div>
        </form>
      )}

      {showForm === 'priceDrop' && (
        <form onSubmit={handlePriceDrop} className="mt-2 p-3 bg-gray-50 rounded-md">
          <div className="space-y-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            />
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                $
              </span>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Target price"
                step="0.01"
                min="0.01"
                className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              />
              <button
                type="submit"
                className="ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Set Alert
              </button>
            </div>
          </div>
        </form>
      )}

      {showForm === 'preOrder' && (
        <form onSubmit={handlePreOrder} className="mt-2 p-3 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-600 mb-2">
            Expected availability: {product.expectedDate}
          </p>
          <div className="flex">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            />
            <button
              type="submit"
              className="ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Pre-order
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default NotificationTriggers;
