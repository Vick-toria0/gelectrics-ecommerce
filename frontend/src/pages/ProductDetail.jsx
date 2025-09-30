import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import NotificationTriggers from '../components/notifications/NotificationTriggers';
import { ArrowLeftIcon, HeartIcon as HeartIconOutline, HeartIcon as HeartIconSolid } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolidFilled } from '@heroicons/react/24/solid';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Use the exact same mock data as in Products.jsx
        const mockProducts = [
          { id: 1, name: 'LED Bulb', price: 9.99, image: '/images/bulb.jpeg', category: 'lighting' },
          { id: 2, name: 'Coaxial Cable', price: 14.99, image: '/images/coaxial.jpeg', category: 'cables' },
          { id: 3, name: 'Explosion Proof Light', price: 199.99, image: '/images/ex-bd.jpeg', category: 'lighting' },
          { id: 4, name: 'Tool Kit', price: 79.99, image: '/images/kit.jpeg', category: 'tools' },
          { id: 5, name: 'Safety Gloves', price: 12.99, image: '/images/safetyglo.jpeg', category: 'safety' },
          { id: 6, name: 'Circuit Breaker', price: 29.99, image: '/images/circbr.jpeg', category: 'switches' },
          { id: 7, name: 'Voltage Tester', price: 24.99, image: '/images/voltest.jpeg', category: 'tools' },
          { id: 8, name: 'Wall Socket', price: 7.99, image: '/images/wasoc.jpeg', category: 'switches' },
        ];
        
        // Add mock details
        const mockDetails = {
          1: {
            description: 'High-quality light bulb with energy efficient LED technology. Perfect for any room in your home.',
            rating: 4.5,
            reviews: 24,
            inStock: true,
            specs: [
              '60W equivalent',
              '800 Lumens',
              'Soft White (2700K)',
              'E26 Base',
              '10,000 hours lifespan'
            ]
          },
          2: {
            description: 'Premium coaxial cable for high-definition audio and video transmission.',
            rating: 4.2,
            reviews: 18,
            inStock: true,
            specs: [
              '50 feet length',
              'Gold-plated connectors',
              '75 Ohm impedance',
              'UV resistant',
              'RG6 type'
            ]
          },
          3: {
            description: 'Explosion proof light fixture designed for hazardous locations.',
            rating: 4.7,
            reviews: 32,
            inStock: true,
            specs: [
              '100W LED',
              'IP66 rated',
              '120-277V',
              '5000K daylight',
              'Aluminum housing'
            ]
          },
          4: {
            description: 'Complete electrical toolkit for all your home improvement projects.',
            rating: 4.8,
            reviews: 45,
            inStock: true,
            specs: [
              '42-piece set',
              'Durable carrying case',
              'VDE insulated',
              'Lifetime warranty',
              'Meets ANSI standards'
            ]
          },
          5: {
            description: 'Heavy-duty safety gloves for electrical work.',
            rating: 4.6,
            reviews: 29,
            inStock: true,
            specs: [
              'Class 00 rated',
              'Rubber insulated',
              'Textured grip',
              'One size fits most',
              'Meets ASTM D120'
            ]
          },
          6: {
            description: '20-amp circuit breaker for electrical panels.',
            rating: 4.9,
            reviews: 56,
            inStock: true,
            specs: [
              '1-pole',
              '120/240V',
              '10kA interrupt rating',
              'Thermal-magnetic protection',
              'UL listed'
            ]
          },
          7: {
            description: 'Non-contact voltage tester with LED display.',
            rating: 4.4,
            reviews: 38,
            inStock: true,
            specs: [
              '12-1000V AC',
              'LED flashlight',
              'Pocket clip',
              'Low battery indicator',
              'CAT III 600V'
            ]
          },
          8: {
            description: 'Standard wall socket with USB ports.',
            rating: 4.7,
            reviews: 42,
            inStock: true,
            specs: [
              '2 USB ports',
              '15A, 125V',
              'Tamper-resistant',
              'LED indicator',
              'Wall plate included'
            ]
          }
        };

        // Find the product and merge with its details
        const productId = parseInt(id, 10);
        const baseProduct = mockProducts.find(p => p.id === productId);
        const details = mockDetails[productId] || {};
        const foundProduct = baseProduct ? { ...baseProduct, ...details } : null;
        
        if (foundProduct) {
          setProduct(foundProduct);
          
          // Find related products (same category, excluding current product)
          const related = mockProducts
            .filter(p => p.id !== productId && p.category === foundProduct.category)
            .slice(0, 4) // Limit to 4 related products
            .map(p => ({
              ...p,
              ...(mockDetails[p.id] || {})
            }));
            
          setRelatedProducts(related);
        } else {
          setError('Product not found');
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to load product');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    // Optionally navigate to cart or show a notification
    // navigate('/cart');
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2 h-96 bg-gray-200 rounded-lg"></div>
            <div className="w-full md:w-1/2 space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              <div className="h-12 bg-gray-200 rounded w-1/2 mt-8"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Product not found</h2>
          <p className="mt-2 text-gray-600">The product you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate('/products')}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCartClick = (e) => {
    e.stopPropagation(); // Prevent navigation when clicking add to cart
    addToCart({ ...product, quantity });
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 mb-6"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-1" />
          Back to Products
        </button>
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 mb-16">
          {/* Product image */}
          <div className="mt-10 lg:mt-0">
            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          {/* Product info */}
          <div className="lg:pt-8">
            <div className="mt-10 lg:mt-0">
              <div className="flex justify-between items-start">
                <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                  {product.name}
                </h1>
                <button
                  type="button"
                  onClick={() => toggleWishlist(product)}
                  className="ml-4 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  aria-label={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  {isInWishlist(product.id) ? (
                    <HeartIconSolidFilled className="h-6 w-6 text-red-500" aria-hidden="true" />
                  ) : (
                    <HeartIconOutline className="h-6 w-6" aria-hidden="true" />
                  )}
                </button>
              </div>
              <p className="text-3xl text-gray-900 mt-3">${product.price.toFixed(2)}</p>

              {/* Reviews */}
              <div className="mt-4">
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <svg
                        key={rating}
                        className={`h-5 w-5 ${
                          rating < Math.floor(product.rating)
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="ml-2 text-sm text-gray-500">
                    {product.rating} out of 5 stars
                  </p>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  {product.reviews} customer reviews
                </p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <div className="space-y-6 text-base text-gray-700">
                <p>{product.description}</p>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center">
                {product.inStock ? (
                  <svg
                    className="h-5 w-5 text-green-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-5 w-5 text-red-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                <p className="ml-2 text-sm text-gray-500">
                  {product.inStock ? 'In stock' : 'Out of stock'}
                </p>
              </div>
            </div>

            {product.inStock && (
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm text-gray-900 font-medium">Quantity</h3>
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-1 text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">Decrease quantity</span>
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    <span className="mx-3 text-gray-700">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-1 text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">Increase quantity</span>
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="mt-10 w-full bg-blue-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Add to bag
                </button>

                <div className="mt-4 flex items-center justify-between">
                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`flex items-center text-sm font-medium ${isInWishlist(product.id) ? 'text-red-500' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    {isInWishlist(product.id) ? (
                      <HeartIconSolidFilled className="h-5 w-5 mr-1" />
                    ) : (
                      <HeartIconOutline className="h-5 w-5 mr-1" />
                    )}
                    {isInWishlist(product.id) ? 'In Wishlist' : 'Add to Wishlist'}
                  </button>
                </div>

                {/* Notification Triggers */}
                <div className="mt-6 border-t border-gray-200 pt-6">
                  <h3 className="text-sm font-medium text-gray-900">Get notified</h3>
                  <NotificationTriggers product={product} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {relatedProducts.map((relatedProduct) => (
              <div 
                key={relatedProduct.id} 
                className="group relative bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-transparent hover:border-blue-100 cursor-pointer"
                onClick={() => navigate(`/products/${relatedProduct.id}`)}
                onKeyDown={(e) => e.key === 'Enter' && navigate(`/products/${relatedProduct.id}`)}
                role="button"
                tabIndex={0}
              >
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={relatedProduct.image}
                    alt=""
                    className="h-full w-full object-contain object-center p-4 group-hover:opacity-90"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-900 line-clamp-2 h-10">
                    {relatedProduct.name}
                  </h3>
                  <p className="mt-2 text-lg font-semibold text-gray-900">
                    ${relatedProduct.price.toFixed(2)}
                    <span className="sr-only">dollars</span>
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart({ ...relatedProduct, quantity: 1 });
                  }}
                  className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 text-sm font-medium"
                  aria-label={`Add ${relatedProduct.name} to cart`}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
