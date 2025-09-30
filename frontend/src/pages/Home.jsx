import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CogIcon, UserCircleIcon, HomeIcon, ShieldCheckIcon, XMarkIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="bg-white relative">
      {/* Temporary Admin Navigation FAB */}
      <div className="fixed bottom-6 right-6 z-50">
        {isMenuOpen ? (
          <div className="bg-white rounded-lg shadow-xl p-4 space-y-2 w-56">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-gray-900">Quick Links</h3>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            <Link 
              to="/profile"
              className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <UserCircleIcon className="h-5 w-5 mr-2 text-blue-600" />
                <span>Profile</span>
              </div>
              <ChevronRightIcon className="h-4 w-4 text-gray-400" />
            </Link>
            <Link 
              to="/dashboard"
              className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <HomeIcon className="h-5 w-5 mr-2 text-green-600" />
                <span>Dashboard</span>
              </div>
              <ChevronRightIcon className="h-4 w-4 text-gray-400" />
            </Link>
            <Link 
              to="/admin/products"
              className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <ShieldCheckIcon className="h-5 w-5 mr-2 text-purple-600" />
                <span>Admin Products</span>
              </div>
              <ChevronRightIcon className="h-4 w-4 text-gray-400" />
            </Link>
          </div>
        ) : (
          <button
            onClick={() => setIsMenuOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            title="Quick Links"
          >
            <CogIcon className="h-6 w-6" />
          </button>
        )}
      </div>
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex items-center">
            {/* Image on the left */}
            <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-10">
              <div className="bg-white/20 rounded-lg overflow-hidden shadow-xl transform -translate-x-4 hover:translate-x-0 transition-transform duration-300">
                <img 
                  src="/images/welcelc.png" 
                  alt="Welcome to our store"
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/600x400/1e40af/ffffff?text=Welcome+Image';
                  }}
                />
              </div>
            </div>
            
            {/* Content on the right - shifted slightly right */}
            <div className="lg:w-1/2 lg:pl-16 pr-4">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                Welcome to Our Store
              </h1>
              <p className="mt-6 text-xl text-blue-100 max-w-lg">
                Discover amazing products at great prices. Shop now and enjoy fast delivery to your doorstep.
              </p>
              <div className="mt-10">
                <Link
                  to="/products"
                  className="inline-block bg-white text-blue-600 py-3 px-8 border border-transparent rounded-md text-base font-medium hover:bg-blue-50 md:py-4 md:text-lg md:px-10 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {/* Placeholder for featured products */}
          {[1, 2, 3, 4].map((product) => (
            <div key={product} className="group">
              <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                <div className="w-full h-full object-center object-cover group-hover:opacity-75">
                  <div className="h-full w-full bg-gray-300 animate-pulse"></div>
                </div>
              </div>
              <h3 className="mt-4 text-sm text-gray-700">Loading product...</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">$---</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
