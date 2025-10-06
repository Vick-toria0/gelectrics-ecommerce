import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const schema = yup.object().shape({
  deliveryMethod: yup.string().oneOf(['delivery', 'pickup']).required('Please select a delivery method'),
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  address: yup.string().when('deliveryMethod', {
    is: 'delivery',
    then: (schema) => schema.required('Address is required for delivery'),
    otherwise: (schema) => schema.notRequired()
  }),
  city: yup.string().when('deliveryMethod', {
    is: 'delivery',
    then: (schema) => schema.required('City is required for delivery'),
    otherwise: (schema) => schema.notRequired()
  }),
  state: yup.string().when('deliveryMethod', {
    is: 'delivery',
    then: (schema) => schema.required('Region is required for delivery'),
    otherwise: (schema) => schema.notRequired()
  }),
  postalCode: yup.string().when('deliveryMethod', {
    is: 'delivery',
    then: (schema) => schema.required('Postal code is required for delivery'),
    otherwise: (schema) => schema.notRequired()
  }),
  // Removed pickupLocation validation since we only have one store
  cardNumber: yup
    .string()
    .matches(/^\d{16}$/, 'Card number must be 16 digits')
    .required('Card number is required'),
  cardExpiry: yup
    .string()
    .matches(
      /^(0[1-9]|1[0-2])\/\d{2}$/,
      'Expiry date must be in MM/YY format'
    )
    .required('Expiry date is required'),
  cardCvc: yup
    .string()
    .matches(/^\d{3,4}$/, 'CVC must be 3 or 4 digits')
    .required('CVC is required'),
});

const Checkout = () => {
  const { items, getCartTotal, clearCart } = useCart();
  const { currentUser } = useAuth();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: currentUser?.email || '',
      deliveryMethod: 'delivery',
    },
  });

  const deliveryMethod = watch('deliveryMethod');

  const onSubmit = async (data) => {
    try {
      setIsProcessing(true);
      setError('');
      
      // In a real app, you would send this data to your backend
      console.log('Order data:', {
        ...data,
        items,
        total: getCartTotal(),
        userId: currentUser?.uid,
      });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Clear cart on success
      clearCart();
      setOrderPlaced(true);
    } catch (err) {
      console.error('Checkout error:', err);
      setError('Failed to place order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Your cart is empty</h2>
            <p className="mt-2 text-gray-600">Add some items to your cart before checking out.</p>
            <div className="mt-6">
              <a
                href="/products"
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                Continue Shopping <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <svg
                className="h-6 w-6 text-green-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="mt-4 text-2xl font-bold text-gray-900">Order Placed Successfully!</h2>
            <p className="mt-2 text-gray-600">
              Thank you for your order. We've sent a confirmation email with your order details.
            </p>
            <p className="mt-1 text-gray-600">
              Your order number is <span className="font-medium">#W086438695</span>.
            </p>
            <div className="mt-6">
              <a
                href="/orders"
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                View Order Status <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-blue-900">Checkout</h1>

        <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Billing Information */}
              <section aria-labelledby="billing-heading" className="space-y-6">
                <h2 id="billing-heading" className="text-2xl font-bold text-blue-900 border-b-2 border-blue-200 pb-2 mb-4">
                  Billing Information
                </h2>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="block text-base font-semibold text-blue-900 mb-1.5">
                      First name <span className="text-red-600">*</span>
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="firstName"
                        {...register('firstName')}
                        className={`block w-full text-base rounded-lg border-gray-300 shadow-sm focus:border-blue-600 focus:ring-blue-500 py-3 px-4 ${
                          errors.firstName ? 'border-red-400' : 'border-gray-300'
                        }`}
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-sm font-medium text-red-600">{errors.firstName.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="lastName" className="block text-base font-semibold text-blue-900 mb-1.5">
                      Last name <span className="text-red-600">*</span>
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="lastName"
                        {...register('lastName')}
                        className={`block w-full text-base rounded-lg border-gray-300 shadow-sm focus:border-blue-600 focus:ring-blue-500 py-3 px-4 ${
                          errors.lastName ? 'border-red-400' : 'border-gray-300'
                        }`}
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="sm:col-span-2 space-y-2">
                    <label htmlFor="email" className="block text-base font-semibold text-blue-900 mb-1.5">
                      Email address <span className="text-red-600">*</span>
                    </label>
                    <div className="mt-1">
                      <input
                        type="email"
                        id="email"
                        {...register('email')}
                        className={`block w-full text-base rounded-lg border-gray-300 shadow-sm focus:border-blue-600 focus:ring-blue-500 py-3 px-4 ${
                          errors.email ? 'border-red-400' : 'border-gray-300'
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              {/* Delivery Method */}
              <section aria-labelledby="delivery-method-heading">
                <h2 id="delivery-method-heading" className="text-lg font-medium text-gray-900">
                  Delivery Method
                </h2>
                <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6">
                  <label className="relative bg-white border-2 border-blue-100 rounded-lg shadow-sm p-6 flex cursor-pointer hover:border-blue-400 transition-all duration-200 hover:shadow-md">
                    <input
                      type="radio"
                      value="delivery"
                      {...register('deliveryMethod')}
                      className="sr-only"
                      aria-labelledby="delivery-option-1-label"
                      aria-describedby="delivery-option-1-description"
                    />
                    <div className="flex-1 flex">
                      <div className="flex flex-col">
                        <span id="delivery-option-1-label" className="block text-sm font-medium text-gray-900">
                          Delivery
                        </span>
                        <span id="delivery-option-1-description" className="mt-1 flex items-center text-sm text-gray-500">
                          Standard delivery to your address
                        </span>
                      </div>
                    </div>
                    <svg className="h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" fill="#1e40af" />
                    </svg>
                  </label>
                  <label className="relative bg-white border-2 border-blue-100 rounded-lg shadow-sm p-6 flex cursor-pointer hover:border-blue-400 transition-all duration-200 hover:shadow-md">
                    <input
                      type="radio"
                      value="pickup"
                      {...register('deliveryMethod')}
                      className="sr-only"
                      aria-labelledby="delivery-option-2-label"
                      aria-describedby="delivery-option-2-description"
                    />
                    <div className="flex-1 flex">
                      <div className="flex flex-col">
                        <span id="delivery-option-2-label" className="block text-sm font-medium text-gray-900">
                          Pickup
                        </span>
                        <span id="delivery-option-2-description" className="mt-1 flex items-center text-sm text-gray-500">
                          Pick up from one of our stores
                        </span>
                      </div>
                    </div>
                    <svg className="h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" fill="#1e40af" />
                    </svg>
                  </label>
                </div>
              </section>

              {/* Shipping Address - Conditionally shown for delivery */}
              {deliveryMethod === 'delivery' && (
                <section aria-labelledby="shipping-heading" className="space-y-6">
                  <h2 id="shipping-heading" className="text-2xl font-bold text-blue-900 border-b-2 border-blue-200 pb-2 mb-4">
                    Shipping Address
                  </h2>

                <div className="space-y-6">
                  <div className="sm:col-span-2 space-y-2">
                    <label htmlFor="address" className="block text-base font-semibold text-blue-900 mb-1.5">
                      Address <span className="text-red-600">*</span>
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="address"
                        {...register('address')}
                        className={`block w-full text-base rounded-lg border-gray-300 shadow-sm focus:border-blue-600 focus:ring-blue-500 py-3 px-4 ${
                          errors.address ? 'border-red-400' : 'border-gray-300'
                        }`}
                      />
                      {errors.address && (
                        <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="city" className="block text-base font-semibold text-blue-900 mb-1.5">
                      City <span className="text-red-600">*</span>
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="city"
                        {...register('city')}
                        className={`block w-full text-base rounded-lg border-gray-300 shadow-sm focus:border-blue-600 focus:ring-blue-500 py-3 px-4 ${
                          errors.city ? 'border-red-400' : 'border-gray-300'
                        }`}
                      />
                      {errors.city && (
                        <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="state" className="block text-base font-semibold text-blue-900 mb-1.5">
                      Region <span className="text-red-600">*</span>
                    </label>
                    <div className="mt-1">
                      <select
                        id="state"
                        {...register('state')}
                        className={`block w-full text-base rounded-lg border-gray-300 shadow-sm focus:border-blue-600 focus:ring-blue-500 py-3 px-4 ${
                          errors.state ? 'border-red-400' : 'border-gray-300'
                        }`}
                        defaultValue=""
                      >
                        <option value="" disabled>Select a region</option>
                        <option value="Ahafo">Ahafo Region</option>
                        <option value="Ashanti">Ashanti Region</option>
                        <option value="Bono">Bono Region</option>
                        <option value="Bono East">Bono East Region</option>
                        <option value="Central">Central Region</option>
                        <option value="Eastern">Eastern Region</option>
                        <option value="Greater Accra">Greater Accra Region</option>
                        <option value="North East">North East Region</option>
                        <option value="Northern">Northern Region</option>
                        <option value="Oti">Oti Region</option>
                        <option value="Savannah">Savannah Region</option>
                        <option value="Upper East">Upper East Region</option>
                        <option value="Upper West">Upper West Region</option>
                        <option value="Volta">Volta Region</option>
                        <option value="Western">Western Region</option>
                        <option value="Western North">Western North Region</option>
                      </select>
                      {errors.state && (
                        <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="postalCode" className="block text-base font-semibold text-blue-900 mb-1.5">
                      Postal code <span className="text-red-600">*</span>
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="postalCode"
                        {...register('postalCode')}
                        className={`block w-full text-base rounded-lg border-gray-300 shadow-sm focus:border-blue-600 focus:ring-blue-500 py-3 px-4 ${
                          errors.postalCode ? 'border-red-400' : 'border-gray-300'
                        }`}
                      />
                      {errors.postalCode && (
                        <p className="mt-1 text-sm text-red-600">{errors.postalCode.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              </section>
              )}

              {/* Pickup Location - Conditionally shown for pickup */}
              {deliveryMethod === 'pickup' && (
                <section aria-labelledby="pickup-location-heading">
                  <h2 id="pickup-location-heading" className="text-lg font-medium text-gray-900">
                    Pickup Location
                  </h2>
                  <div className="mt-6">
                    <h3 className="text-sm font-medium text-gray-900">Store Location</h3>
                    <div className="mt-2 bg-gray-50 p-4 rounded-md">
                      <p className="font-medium">Gelectrics Main Store</p>
                      <p className="text-gray-600">123 Electric Avenue</p>
                      <p className="text-gray-600">Tech City, TC 12345</p>
                      <p className="text-gray-600">Phone: (123) 456-7890</p>
                      <p className="text-gray-600">Hours: Mon-Fri 9am-7pm, Sat 10am-5pm</p>
                    </div>
                    <div className="mt-4 bg-blue-50 p-4 rounded-md">
                      <h3 className="text-sm font-medium text-blue-800">Pickup Information</h3>
                      <p className="mt-1 text-sm text-blue-700">
                        Items will be ready for pickup within 1-2 business days. We'll send you an email when your order is ready.
                      </p>
                      <p className="mt-2 text-sm text-blue-700">
                        Please bring a valid ID and your order confirmation when picking up.
                      </p>
                    </div>
                  </div>
                </section>
              )}

              {/* Payment */}
              <section aria-labelledby="payment-heading">
                <h2 id="payment-heading" className="text-2xl font-bold text-blue-900 border-b-2 border-blue-200 pb-2 mb-4">
                  Payment Information
                </h2>

                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                  <div className="sm:col-span-2 space-y-2">
                    <label htmlFor="cardNumber" className="block text-base font-semibold text-blue-900 mb-1.5">
                      Card number <span className="text-red-600">*</span>
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="cardNumber"
                        placeholder="0000 0000 0000 0000"
                        {...register('cardNumber')}
                        className={`block w-full text-base rounded-lg border-gray-300 shadow-sm focus:border-blue-600 focus:ring-blue-500 py-3 px-4 ${
                          errors.cardNumber ? 'border-red-400' : 'border-gray-300'
                        }`}
                      />
                      {errors.cardNumber && (
                        <p className="mt-1 text-sm text-red-600">{errors.cardNumber.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="cardExpiry" className="block text-base font-semibold text-blue-900 mb-1.5">
                      Expiration date (MM/YY) <span className="text-red-600">*</span>
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="cardExpiry"
                        placeholder="MM/YY"
                        {...register('cardExpiry')}
                        className={`block w-full text-base rounded-lg border-gray-300 shadow-sm focus:border-blue-600 focus:ring-blue-500 py-3 px-4 ${
                          errors.cardExpiry ? 'border-red-400' : 'border-gray-300'
                        }`}
                      />
                      {errors.cardExpiry && (
                        <p className="mt-1 text-sm text-red-600">{errors.cardExpiry.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="cardCvc" className="block text-base font-semibold text-blue-900 mb-1.5">
                      CVC <span className="text-red-600">*</span>
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="cardCvc"
                        placeholder="CVC"
                        {...register('cardCvc')}
                        className={`block w-full text-base rounded-lg border-gray-300 shadow-sm focus:border-blue-600 focus:ring-blue-500 py-3 px-4 ${
                          errors.cardCvc ? 'border-red-400' : 'border-gray-300'
                        }`}
                      />
                      {errors.cardCvc && (
                        <p className="mt-1 text-sm text-red-600">{errors.cardCvc.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              {error && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-red-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">{error}</h3>
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-5">
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className={`ml-3 inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      isProcessing ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                  >
                    {isProcessing ? 'Processing...' : 'Place Order'}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Order summary */}
          <div className="mt-10 lg:mt-0 lg:col-span-5">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <h2 className="sr-only">Order summary</h2>

              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">Order Summary</h3>

                <div className="mt-6">
                  <ul className="divide-y divide-gray-200">
                    {items.map((item) => (
                      <li key={item.id} className="py-4 flex">
                        <div className="flex-shrink-0">
                          <img
                            src={item.image || 'https://via.placeholder.com/150'}
                            alt={item.name}
                            className="w-20 h-20 rounded-md object-center object-cover"
                          />
                        </div>

                        <div className="ml-4 flex-1 flex flex-col">
                          <div className="space-y-2">
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>{item.name}</h3>
                              <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">Qty {item.quantity}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <dl className="mt-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <dt className="text-sm">Subtotal</dt>
                      <dd className="text-sm font-medium text-gray-900">GH₵{getCartTotal().toFixed(2)}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-sm">Shipping</dt>
                      <dd className="text-sm font-medium text-gray-900">GH₵0.00</dd>
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                      <dt className="text-base font-medium">Order total</dt>
                      <dd className="text-base font-medium text-gray-900">GH₵{getCartTotal().toFixed(2)}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
