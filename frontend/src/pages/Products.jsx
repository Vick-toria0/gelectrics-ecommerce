import React, { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { 
  MagnifyingGlassIcon, 
  FunnelIcon, 
  ArrowsUpDownIcon, 
  StarIcon,
  ShoppingCartIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
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
    { value: 'popular', label: 'Most Popular' },
    { value: 'newest', label: 'Newest First' },
  ];

  const priceRanges = [
    { id: 'all', name: 'All Prices' },
    { id: '0-50', name: 'Under GH₵50' },
    { id: '50-100', name: 'GH₵50 - GH₵100' },
    { id: '100-200', name: 'GH₵100 - GH₵200' },
    { id: '200+', name: 'Over GH₵200' },
  ];

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const selectedCategory = searchParams.get('category') || 'all';
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      
      const priceRange = searchParams.get('price') || 'all';
      let matchesPrice = true;
      
      if (priceRange !== 'all') {
        if (priceRange.endsWith('+')) {
          matchesPrice = product.price >= Number(priceRange.replace('+', ''));
        } else {
          const [min, max] = priceRange.split('-').map(Number);
          matchesPrice = product.price >= min && product.price <= max;
        }
      }
      
      return matchesSearch && matchesCategory && matchesPrice;
    }).sort((a, b) => {
      switch (sortConfig.key) {
        case 'name':
          return sortConfig.direction === 'asc' 
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        case 'price':
          return sortConfig.direction === 'asc' 
            ? a.price - b.price 
            : b.price - a.price;
        case 'popular':
          return (b.rating || 0) - (a.rating || 0);
        case 'newest':
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        default:
          return 0;
      }
    });
  }, [products, searchTerm, sortConfig, searchParams]);

  // Get current products for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

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
    if (e.target.value === 'popular' || e.target.value === 'newest') {
      setSortConfig({ key: e.target.value, direction: 'desc' });
    } else {
      const [key, direction] = e.target.value.split('-');
      setSortConfig({ key, direction });
    }
  };

  // Handle price range filter
  const handlePriceRangeChange = (range) => {
    const params = new URLSearchParams(searchParams);
    if (range === 'all') {
      params.delete('price');
    } else {
      params.set('price', range);
    }
    setSearchParams(params);
  };

  // Handle category filter
  const handleCategoryChange = (categoryId) => {
    const params = new URLSearchParams(searchParams);
    if (categoryId === 'all') {
      params.delete('category');
    } else {
      params.set('category', categoryId);
    }
    setSearchParams(params);
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
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 mb-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Shop Electrical Supplies</h1>
          <p className="text-blue-100">Find high-quality electrical components and tools for your projects</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar filters */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center">
                      <input
                        id={`category-${category.id}`}
                        name="category"
                        type="radio"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        checked={(searchParams.get('category') || 'all') === category.id}
                        onChange={() => handleCategoryChange(category.id)}
                      />
                      <label htmlFor={`category-${category.id}`} className="ml-3 text-sm text-gray-700 hover:text-gray-900 cursor-pointer">
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-medium text-gray-900 mb-3">Price Range</h3>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <div key={range.id} className="flex items-center">
                      <input
                        id={`price-${range.id}`}
                        name="price-range"
                        type="radio"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        checked={(searchParams.get('price') || 'all') === range.id}
                        onChange={() => handlePriceRangeChange(range.id)}
                      />
                      <label htmlFor={`price-${range.id}`} className="ml-3 text-sm text-gray-700 hover:text-gray-900 cursor-pointer">
                        {range.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1">
            {/* Search and sort bar */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              {/* Search */}
              <div className="relative flex-1 w-full sm:max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm transition duration-150 ease-in-out"
                />
              </div>

              {/* Sort */}
              <div className="flex items-center w-full sm:w-auto">
                <label htmlFor="sort" className="mr-2 text-sm font-medium text-gray-700 whitespace-nowrap">
                  Sort by:
                </label>
                <select
                  id="sort"
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm rounded-md shadow-sm"
                  value={['popular', 'newest'].includes(sortConfig.key) ? sortConfig.key : `${sortConfig.key}-${sortConfig.direction}`}
                  onChange={handleSortChange}
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Mobile filter button */}
              <button
                type="button"
                className="lg:hidden inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 w-full justify-center"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
              >
                <FunnelIcon className="h-5 w-5 mr-2 text-gray-400" />
                {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
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

            {/* Products grid */}
            {loading ? (
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 animate-pulse">
                    <div className="h-48 bg-gray-200 w-full"></div>
                    <div className="p-4">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2 mb-3"></div>
                      <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="mt-8 text-center text-red-600 bg-red-50 p-4 rounded-lg">
                <p className="font-medium">Error loading products</p>
                <p className="text-sm mt-1">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-2 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Retry
                </button>
              </div>
            ) : filteredProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                  {currentProducts.map((product) => (
                    <div key={product.id} className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-100">
                      {/* Product image */}
                      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-xl bg-gray-100 relative">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-64 w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                        />
                        
                        
                        {/* Wishlist button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(product);
                          }}
                          className={`absolute top-3 right-3 p-2 rounded-full ${isInWishlist(product.id) ? 'text-red-500' : 'text-gray-400 hover:text-red-500'} bg-white/90 backdrop-blur-sm shadow-sm hover:shadow transition-all duration-200`}
                          aria-label={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                        >
                          <HeartIconSolid className={`h-5 w-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                        </button>
                        
                        {/* Category tag */}
                        <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-medium px-2.5 py-0.5 rounded-full">
                          {product.category}
                        </span>
                      </div>
                      
                      {/* Product info */}
                      <div className="p-5">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
                              {product.name}
                            </h3>
                            <div className="flex items-center mb-2">
                              <div className="flex items-center">
                                {[0, 1, 2, 3, 4].map((rating) => (
                                  <StarIcon
                                    key={rating}
                                    className={`h-4 w-4 ${rating < (product.rating || 4) ? 'text-yellow-400' : 'text-gray-300'}`}
                                    aria-hidden="true"
                                  />
                                ))}
                              </div>
                              <span className="ml-2 text-sm text-gray-500">({product.reviewCount || Math.floor(Math.random() * 100)})</span>
                            </div>
                          </div>
                          <span className="text-lg font-bold text-blue-600">${product.price.toFixed(2)}</span>
                        </div>
                        
                        <div className="mt-4 flex items-center justify-between">
                          <button
                            onClick={() => addToCart({ ...product, quantity: 1 })}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium text-sm transition-colors duration-200 flex items-center justify-center"
                          >
                            <ShoppingCartIcon className="h-4 w-4 mr-2" />
                            Add to Cart
                          </button>
                        </div>
                        
                        {/* Stock status */}
                        {product.stock && (
                          <div className="mt-3">
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div 
                                className={`h-1.5 rounded-full ${product.stock > 20 ? 'bg-green-500' : product.stock > 10 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                style={{ width: `${Math.min(100, (product.stock / 50) * 100)}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              {product.stock} left in stock
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <nav className="mt-10 flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
                    <div className="flex flex-1 justify-between sm:hidden">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50'}`}
                      >
                        Previous
                      </button>
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50'}`}
                      >
                        Next
                      </button>
                    </div>
                    
                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm text-gray-700">
                          Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                          <span className="font-medium">
                            {Math.min(currentPage * itemsPerPage, filteredProducts.length)}
                          </span>{' '}
                          of <span className="font-medium">{filteredProducts.length}</span> results
                        </p>
                      </div>
                      <div>
                        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                          <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            <span className="sr-only">Previous</span>
                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                              />
                            </svg>
                          </button>
                          
                          {/* Page numbers */}
                          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            let pageNum;
                            if (totalPages <= 5) {
                              pageNum = i + 1;
                            } else if (currentPage <= 3) {
                              pageNum = i + 1;
                            } else if (currentPage >= totalPages - 2) {
                              pageNum = totalPages - 4 + i;
                            } else {
                              pageNum = currentPage - 2 + i;
                            }
                            
                            return (
                              <button
                                key={pageNum}
                                onClick={() => handlePageChange(pageNum)}
                                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${currentPage === pageNum ? 'z-10 bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600' : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0'}`}
                              >
                                {pageNum}
                              </button>
                            );
                          })}
                          
                          <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            <span className="sr-only">Next</span>
                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path
                                fillRule="evenodd"
                                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                              />
                            </svg>
                          </button>
                        </nav>
                      </div>
                    </div>
                  </nav>
                )}
              </>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No products found</h3>
                <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setSearchTerm('');
                      setSearchParams({});
                    }}
                    className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    <svg className="-ml-0.5 mr-1.5 h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                      />
                    </svg>
                    Clear all filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
