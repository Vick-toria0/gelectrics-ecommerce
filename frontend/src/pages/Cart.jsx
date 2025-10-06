import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, getCartTotal, getCartCount } = useCart();

  if (items.length === 0) {
    return (
      <div className="bg-blue-50 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 w-full">
          <div className="text-center bg-white p-8 rounded-xl shadow-md border-2 border-blue-100">
            <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-blue-100">
              <svg
                className="h-12 w-12 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </div>
            <h2 className="mt-6 text-2xl font-bold text-blue-900">Your cart is empty</h2>
            <p className="mt-2 text-blue-700">Start shopping to add items to your cart.</p>
            <div className="mt-8">
              <Link
                to="/products"
                className="inline-flex items-center px-6 py-3 border-2 border-transparent rounded-lg shadow-md text-base font-bold text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 transform hover:scale-105"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-8">
          <Link to="/products" className="text-blue-700 hover:text-blue-900 mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </Link>
          <h1 className="text-3xl font-extrabold tracking-tight text-blue-900">Shopping Cart</h1>
        </div>

        <div className="mt-8 lg:grid lg:grid-cols-12 lg:gap-8 lg:items-start">
          <section aria-labelledby="cart-heading" className="lg:col-span-8">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>

            <ul className="border-t-2 border-b-2 border-blue-100 divide-y divide-blue-100 bg-white rounded-xl shadow-sm overflow-hidden">
              {items.map((item) => (
                <li key={item.id} className="flex p-6 hover:bg-blue-50 transition-colors duration-200">
                  <div className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 bg-blue-50 rounded-lg overflow-hidden">
                    <img
                      src={item.image || 'https://via.placeholder.com/150'}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-base sm:text-lg">
                            <Link
                              to={`/products/${item.id}`}
                              className="font-semibold text-blue-900 hover:text-blue-700 transition-colors duration-200"
                            >
                              {item.name}
                            </Link>
                          </h3>
                        </div>
                        <p className="mt-1 text-base font-bold text-blue-800">GH₵{item.price.toFixed(2)}</p>
                      </div>

                      <div className="mt-4 sm:mt-0 sm:pr-9">
                        <label htmlFor={`quantity-${item.id}`} className="block text-sm font-semibold text-blue-900 mb-1.5">
                          Quantity
                        </label>
                        <div className="flex items-center">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="p-1.5 text-blue-500 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-200 rounded-md transition-colors duration-200"
                            disabled={item.quantity <= 1}
                          >
                            <span className="sr-only">Decrease quantity</span>
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <input
                            type="number"
                            id={`quantity-${item.id}`}
                            name={`quantity-${item.id}`}
                            min="1"
                            value={item.quantity}
                            onChange={(e) => {
                              const value = parseInt(e.target.value) || 1;
                              updateQuantity(item.id, Math.max(1, value));
                            }}
                            className="mx-2 w-16 text-center border-2 border-blue-100 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-blue-900 font-medium [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1.5 text-blue-500 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-200 rounded-md transition-colors duration-200"
                          >
                            <span className="sr-only">Increase quantity</span>
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>

                        <div className="absolute top-0 right-0">
                          <button
                            type="button"
                            className="-m-2 p-2 inline-flex text-blue-400 hover:text-red-600 transition-colors duration-200"
                            onClick={() => removeFromCart(item.id)}
                            aria-label="Remove item"
                          >
                            <svg
                              className="h-5 w-5"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Order summary */}
          <section
            aria-labelledby="summary-heading"
            className="mt-8 lg:mt-0 bg-white rounded-xl shadow-md border-2 border-blue-100 p-6 lg:col-span-4 h-fit sticky top-8"
          >
            <h2 id="summary-heading" className="text-xl font-bold text-blue-900 border-b-2 border-blue-100 pb-3 mb-6">
              Order Summary
            </h2>

            <dl className="space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-base text-blue-700">Subtotal</dt>
                <dd className="text-base font-semibold text-blue-900">GH₵{getCartTotal().toFixed(2)}</dd>
              </div>
              <div className="border-t-2 border-blue-100 pt-4 mt-4 flex items-center justify-between">
                <dt className="text-lg font-bold text-blue-900">Order Total</dt>
                <dd className="text-xl font-bold text-blue-800">GH₵{getCartTotal().toFixed(2)}</dd>
              </div>
            </dl>

            <div className="mt-8">
              <Link
                to="/checkout"
                className="w-full bg-blue-700 border-2 border-transparent rounded-lg shadow-md py-3 px-6 text-base font-bold text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center transition-colors duration-200 transform hover:scale-[1.02]"
              >
                Proceed to Checkout
              </Link>
            </div>

            <div className="mt-6 text-center">
              <p className="text-blue-700">
                or{' '}
                <Link
                  to="/products"
                  className="font-semibold text-blue-700 hover:text-blue-900 transition-colors duration-200"
                >
                  Continue Shopping <span aria-hidden="true">&rarr;</span>
                </Link>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Cart;
