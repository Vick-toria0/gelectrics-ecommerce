import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import NotificationButton from '../notifications/NotificationButton';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

const Header = () => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  
  // Helper function to determine if a link is active
  const isActive = (path) => {
    return location.pathname === path || 
           (path !== '/' && location.pathname.startsWith(path));
  };

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-gray-900">
            Gelectrics
          </Link>
          <nav className="flex items-center space-x-2">
            <Link 
              to="/products" 
              className={`${isActive('/products') ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'}`}
            >
              Products
            </Link>
            <Link 
              to="/cart" 
              className={`p-2 ${isActive('/cart') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
              title="Cart"
            >
              <ShoppingCartIcon className="h-6 w-6" />
            </Link>
            
            {/* Notification Button */}
            <div className="ml-2">
              <NotificationButton />
            </div>
            {currentUser ? (
              <>
                <Link 
                  to="/dashboard" 
                  className={`${isActive('/dashboard') ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'}`}
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="text-gray-700 hover:text-blue-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className={`${isActive('/login') ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'}`}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className={`px-4 py-2 rounded-md ${isActive('/register') ? 'bg-blue-700 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                >
                  Sign Up
                </Link>
              </>
            )}

          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
