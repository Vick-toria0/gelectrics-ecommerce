import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Header from './Header';
import Footer from './Footer';

const PageLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {!isHomePage && (
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-blue-600 mb-4 transition-colors"
              aria-label="Go back to previous page"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-1" />
              <span>Back</span>
            </button>
          )}
          <div className={!isHomePage ? 'mt-2' : ''}>
            <Outlet />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;
