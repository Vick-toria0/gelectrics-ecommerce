import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start space-x-6">
            <Link to="/about" className="text-gray-500 hover:text-gray-700">
              About
            </Link>
            <Link to="/contact" className="text-gray-500 hover:text-gray-700">
              Contact
            </Link>
            <Link to="/terms" className="text-gray-500 hover:text-gray-700">
              Terms & Conditions
            </Link>
            <Link to="/privacy" className="text-gray-500 hover:text-gray-700">
              Privacy Policy
            </Link>
          </div>
          <div className="mt-8 md:mt-0 text-center md:text-right">
            <p className="text-base text-gray-500">
              &copy; {new Date().getFullYear()} Gelectrics. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
