import React from 'react';
import { Link } from 'react-router-dom';
import { MapPinIcon, PhoneIcon, EnvelopeIcon, ClockIcon } from '@heroicons/react/24/outline';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted');
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12 rounded-b-xl shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Contact Us</h1>
          <p className="mt-2 text-blue-100/90 max-w-3xl">
            Have questions or need assistance? Our team is here to help.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
            
            <div className="space-y-6">
              <div className="flex items-start p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-blue-100">
                <div className="flex-shrink-0">
                  <div className="p-3 bg-blue-50 rounded-xl">
                    <MapPinIcon className="h-5 w-5 text-blue-600" aria-hidden="true" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-base font-semibold text-gray-800">Our Location</h3>
                  <p className="mt-1.5 text-gray-600 leading-relaxed">
                    3PVV+HMC<br />
                    Koforidua, Ghana
                  </p>
                </div>
              </div>

              <div className="flex items-start p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-blue-100">
                <div className="flex-shrink-0">
                  <div className="p-3 bg-blue-50 rounded-xl">
                    <PhoneIcon className="h-5 w-5 text-blue-600" aria-hidden="true" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-base font-semibold text-gray-800">Phone</h3>
                  <p className="mt-1.5 text-gray-600">
                    024 048 6916
                  </p>
                </div>
              </div>

              <div className="flex items-start p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-blue-100">
                <div className="flex-shrink-0">
                  <div className="p-3 bg-blue-50 rounded-xl">
                    <EnvelopeIcon className="h-5 w-5 text-blue-600" aria-hidden="true" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-base font-semibold text-gray-800">Email</h3>
                  <p className="mt-1.5 text-gray-600">
                    info@gelectrics.gh<br />
                    support@gelectrics.gh
                  </p>
                </div>
              </div>

              <div className="flex items-start p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-blue-100">
                <div className="flex-shrink-0">
                  <div className="p-3 bg-blue-50 rounded-xl">
                    <ClockIcon className="h-5 w-5 text-blue-600" aria-hidden="true" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-base font-semibold text-gray-800">Working Hours</h3>
                  <p className="mt-1.5 text-gray-600 leading-relaxed">
                    Monday - Saturday: 7:00 AM - 7:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-gray-100">
              <h3 className="text-base font-semibold text-gray-800 mb-4">Follow Us</h3>
              <div className="flex space-x-3">
                <a href="#" className="text-gray-500 hover:text-blue-700 transition-colors duration-200">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-blue-500 transition-colors duration-200">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-red-600 transition-colors duration-200">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.976.045-1.505.207-1.858.344-.466.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.976.207 1.505.344 1.858.182.466.399.8.748 1.15.35.35.684.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.684.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-100">Send us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="mt-1 block w-full rounded-lg border-2 border-gray-200 bg-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:text-sm p-2.5 transition-colors duration-200"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="mt-1 block w-full rounded-lg border-2 border-gray-200 bg-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:text-sm p-2.5 transition-colors duration-200"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="mt-1 block w-full rounded-lg border-2 border-gray-200 bg-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:text-sm p-2.5 transition-colors duration-200"
                  placeholder="+233 24 123 4567"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                  Subject <span className="text-red-500">*</span>
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  className="mt-1 block w-full rounded-lg border-2 border-gray-200 bg-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:text-sm p-2.5 transition-colors duration-200"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="order">Order Status</option>
                  <option value="returns">Returns & Exchanges</option>
                  <option value="wholesale">Wholesale Inquiries</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="mt-1 block w-full rounded-lg border-2 border-gray-200 bg-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:text-sm p-2.5 transition-colors duration-200"
                  placeholder="How can we help you?"
                  defaultValue={''}
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex justify-center py-3.5 px-6 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-all duration-200 hover:shadow-md"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-100">Find Us on the Map</h2>
          <div className="bg-gray-100 rounded-xl overflow-hidden h-[500px] shadow-inner">
            {/* Replace this iframe with your actual map embed code */}
            <iframe
              title="Our Location"
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              marginHeight="0"
              marginWidth="0"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.729050340163!2d-0.2819879241488264!3d6.093056093768252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdb8f7a8d4b0a5d%3A0x6e1f3e3b3b0b0b0b0!2s3PVV%2BHMC%2C%20Koforidua!5e0!3m2!1sen!2sgh!4v1620000000000!5m2!1sen!2sgh"
              className="border-0"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
