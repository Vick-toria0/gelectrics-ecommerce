import React, { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { MagnifyingGlassIcon, FunnelIcon, ArrowsUpDownIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const navigate = useNavigate();
  const itemsPerPage = 8;

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'lighting', name: 'Lighting' },
    { id: 'cables', name: 'Cables & Wires' },
    { id: 'tools', name: 'Tools & Equipment' },
    { id: 'safety', name: 'Safety Equipment' },
    { id: 'switches', name: 'Switches & Sockets' },
    { id: 'appliances', name: 'Electrical Appliances' },
  ];

  const sortOptions = [
    { value: 'name-asc', label: 'Name (A-Z)' },
    { value: 'name-desc', label: 'Name (Z-A)' },
    { value: 'price-asc', label: 'Price (Low to High)' },
    { value: 'price-desc', label: 'Price (High to Low)' },
  ];

  // This would typically be an API call
  useEffect(() => {
    // Simulate API call
    const fetchProducts = async () => {
      try {
        // In a real app, this would be: const response = await fetch('/api/products');
        // const data = await response.json();
        
        // Mock data with categories
        setTimeout(() => {
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
          
          setProducts(mockProducts);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError('Failed to load products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Process and filter products
  const processedProducts = useMemo(() => {
    let result = [...products];
    const category = searchParams.get('category') || 'all';
    const search = searchParams.get('q') || '';

    // Apply category filter
    if (category !== 'all') {
      result = result.filter(product => product.category === category);
    }

    // Apply search filter
    if (search.trim() !== '') {
      const term = search.toLowerCase().trim();
      result = result.filter(product => 
        product.name.toLowerCase().includes(term) ||
        (product.description && product.description.toLowerCase().includes(term))
      );
    }

    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return result;
  }, [products, searchParams, sortConfig]);

  // Get current products for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = processedProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(processedProducts.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchTerm) {
      params.set('q', searchTerm);
    } else {
      params.delete('q');
    }
    setSearchParams(params);
    setCurrentPage(1);
  };

  // Handle sort change
  const handleSortChange = (e) => {
    const [key, direction] = e.target.value.split('-');
    setSortConfig({ key, direction });
    setCurrentPage(1);
  };

  const handleCategoryChange = (categoryId) => {
    const params = new URLSearchParams(searchParams);
    if (categoryId === 'all') {
      params.delete('category');
    } else {
      params.set('category', categoryId);
    }
    setSearchParams(params);
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="w-full md:w-1/3 h-10 bg-gray-200 rounded"></div>
            <div className="w-full md:w-1/4 h-10 bg-gray-200 rounded"></div>
          </div>
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="w-full h-64 bg-gray-200 rounded-md"></div>
                <div className="mt-4 h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="mt-2 h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
            ))}
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

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-6 md:py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 md:mb-8" id="products-heading">Our Products</h1>
        
        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 md:mb-8">
          {/* Mobile filter button */}
          <div className="md:hidden w-full">
            <button
              type="button"
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              aria-expanded={showMobileFilters}
              aria-controls="mobile-filters"
            >
              <FunnelIcon className="h-5 w-5 mr-2 text-gray-500" aria-hidden="true" />
              Filters
            </button>
          </div>

          {/* Search */}
          <div className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
            <form onSubmit={handleSearch} role="search" aria-label="Products">
              <label htmlFor="search" className="sr-only">Search products</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="search"
                  name="search"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search products by name..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base sm:text-sm"
                  aria-describedby="search-description"
                />
              </div>
              <p id="search-description" className="mt-1 text-sm text-gray-500 sr-only">
                Search for products by name
              </p>
            </form>
          </div>

          {/* Sort - Hide on small screens, show on medium and up */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center">
              <ArrowsUpDownIcon className="h-5 w-5 text-gray-400 mr-2" aria-hidden="true" />
              <label htmlFor="sort" className="mr-2 text-sm font-medium text-gray-700">
                Sort by:
              </label>
              <select
                id="sort"
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={`${sortConfig.key}-${sortConfig.direction}`}
                onChange={handleSortChange}
                aria-label="Sort products by"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Mobile sort button */}
          <div className="md:hidden w-full">
            <select
              id="mobile-sort"
              className="block w-full pl-3 pr-10 py-3 text-base border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={`${sortConfig.key}-${sortConfig.direction}`}
              onChange={handleSortChange}
              aria-label="Sort products by"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-4 lg:gap-x-8">
          {/* Category Filter - Desktop */}
          <div className="hidden lg:block" aria-labelledby="desktop-categories-heading">
            <h2 id="desktop-categories-heading" className="text-lg font-medium text-gray-900 mb-4">Categories</h2>
            <nav className="space-y-2" aria-label="Product categories">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`block w-full text-left px-4 py-2.5 text-sm rounded-md transition-colors ${
                    (searchParams.get('category') || 'all') === category.id
                      ? 'bg-blue-50 text-blue-700 font-medium ring-2 ring-blue-500 ring-opacity-50'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  aria-current={(searchParams.get('category') || 'all') === category.id ? 'page' : undefined}
                >
                  {category.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Mobile Category Filter */}
          {showMobileFilters && (
            <div id="mobile-filters" className="lg:hidden mb-6 p-4 bg-white rounded-lg shadow-lg border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">Categories</h2>
                <button 
                  type="button" 
                  className="text-gray-400 hover:text-gray-500"
                  onClick={() => setShowMobileFilters(false)}
                  aria-label="Close filters"
                >
                  <span className="sr-only">Close menu</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <nav className="grid grid-cols-2 gap-3" aria-label="Product categories">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      handleCategoryChange(category.id);
                      setShowMobileFilters(false);
                    }}
                    className={`px-4 py-3 text-sm rounded-md text-center transition-colors ${
                      (searchParams.get('category') || 'all') === category.id
                        ? 'bg-blue-600 text-white font-medium ring-2 ring-blue-500 ring-offset-1'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                    aria-current={(searchParams.get('category') || 'all') === category.id ? 'page' : undefined}
                  >
                    {category.name}
                  </button>
                ))}
              </nav>
            </div>
          )}

          {/* Product Grid */}
          <div className="lg:col-span-3" role="region" aria-labelledby="products-heading">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 xl:gap-8">
              {currentProducts.length > 0 ? (
                currentProducts.map((product) => (
                  <article 
                    key={product.id} 
                    className="group bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 h-full flex flex-col border border-transparent hover:border-blue-100 cursor-pointer"
                    aria-labelledby={`product-${product.id}-title`}
                    onClick={() => navigate(`/products/${product.id}`)}
                    onKeyDown={(e) => e.key === 'Enter' && navigate(`/products/${product.id}`)}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="flex-1">
                      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80 relative">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleWishlist(product);
                          }}
                          className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md z-10 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          aria-label={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                        >
                          {isInWishlist(product.id) ? (
                            <HeartIconSolid className="h-5 w-5 text-red-500" aria-hidden="true" />
                          ) : (
                            <HeartIconSolid className="h-5 w-5 text-gray-400 hover:text-red-500" aria-hidden="true" />
                          )}
                        </button>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                        />
                      </div>
                      <div className="mt-4">
                        <h3 id={`product-${product.id}-title`} className="text-sm font-medium text-gray-900 line-clamp-2 h-10">
                          {product.name}
                        </h3>
                        <p className="mt-2 text-lg font-semibold text-gray-900">
                          ${product.price.toFixed(2)}
                          <span className="sr-only">dollars</span>
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <button
                        onClick={() => addToCart(product)}
                        className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 text-sm font-medium"
                        aria-label={`Add ${product.name} to cart`}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </article>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500">No products found. Try adjusting your search or filter criteria.</p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <nav 
                className="mt-12 flex items-center justify-between border-t border-gray-200 px-4 sm:px-0"
                aria-label="Pagination"
              >
                <div className="-mt-px flex w-0 flex-1">
                  <button
                    onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                    disabled={currentPage === 1}
                    className={`inline-flex items-center pt-4 pr-1 text-sm font-medium ${
                      currentPage === 1 
                        ? 'text-gray-300 cursor-not-allowed' 
                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } border-t-2 border-transparent`}
                    aria-disabled={currentPage === 1}
                    aria-label="Previous page"
                  >
                    <svg className="mr-3 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Previous
                  </button>
                </div>
                
                <div className="hidden md:-mt-px md:flex">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`inline-flex items-center px-4 pt-4 text-sm font-medium ${
                        currentPage === number
                          ? 'border-blue-500 text-blue-600 border-t-2'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2'
                      }`}
                      aria-current={currentPage === number ? 'page' : undefined}
                      aria-label={`Page ${number}${currentPage === number ? ', current page' : ''}`}
                    >
                      {number}
                    </button>
                  ))}
                </div>
                
                <div className="-mt-px flex w-0 flex-1 justify-end">
                  <button
                    onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
                    disabled={currentPage === totalPages}
                    className={`inline-flex items-center pt-4 pl-1 text-sm font-medium ${
                      currentPage === totalPages 
                        ? 'text-gray-300 cursor-not-allowed' 
                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } border-t-2 border-transparent`}
                    aria-disabled={currentPage === totalPages}
                    aria-label="Next page"
                  >
                    Next
                    <svg className="ml-3 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </nav>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
