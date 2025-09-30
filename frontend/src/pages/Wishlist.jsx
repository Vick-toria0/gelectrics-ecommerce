import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../contexts/WishlistContext';
import { XMarkIcon, ArrowLeftIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { useCart } from '../contexts/CartContext';

const Wishlist = () => {
  const { 
    wishlist, 
    removeFromWishlist, 
    clearWishlist, 
    isInWishlist 
  } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (product) => {
    addToCart({ ...product, quantity: 1 });
    removeFromWishlist(product.id);
  };

  if (wishlist.length === 0) {
    return (
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Your wishlist is empty
            </h1>
            <p className="mt-4 text-base text-gray-500">
              You haven't added any products to your wishlist yet.
            </p>
            <div className="mt-6">
              <Link
                to="/products"
                className="text-base font-medium text-blue-600 hover:text-blue-500"
              >
                Continue Shopping<span aria-hidden="true"> &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Your Wishlist</h1>
          <button
            onClick={clearWishlist}
            className="text-sm font-medium text-red-600 hover:text-red-500"
          >
            Clear all items
          </button>
        </div>

        <div className="mt-8">
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {wishlist.map((product) => (
                <li key={product.id} className="py-6 flex">
                  <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-center object-cover"
                    />
                  </div>

                  <div className="ml-4 flex-1 flex flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <Link to={`/products/${product.id}`}>
                            {product.name}
                          </Link>
                        </h3>
                        <p className="ml-4">${product.price.toFixed(2)}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                    </div>
                    <div className="flex-1 flex items-end justify-between text-sm">
                      <div className="flex space-x-4">
                        <button
                          type="button"
                          onClick={() => handleMoveToCart(product)}
                          className="font-medium text-blue-600 hover:text-blue-500"
                        >
                          Move to cart
                        </button>
                        <button
                          type="button"
                          onClick={() => removeFromWishlist(product.id)}
                          className="font-medium text-red-600 hover:text-red-500"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
