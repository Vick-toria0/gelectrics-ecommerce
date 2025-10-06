import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { WishlistProvider } from './contexts/WishlistContext';
import { NotificationProvider } from './contexts/NotificationContext';
import PageLayout from './components/layout/PageLayout';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import AdminProducts from './pages/admin/AdminProducts';
import Wishlist from './pages/Wishlist';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';
import Contact from './pages/Contact';
import AdminRoute from './components/auth/AdminRoute';

// Protected Route Component - Temporarily bypassing authentication for testing
const PrivateRoute = ({ children, adminOnly = false }) => {
  // Temporarily bypassing authentication for testing
  return children;
  
  /* Original authentication logic (commented out for now)
  const { currentUser } = useAuth();
  const location = useLocation();
  
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  
  if (adminOnly && currentUser.role !== 'admin') {
    return <Navigate to="/" />;
  }
  
  return children;
  */
};

// Layout Wrapper Component
const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  const isAuthPage = ['/login', '/register', '/forgot-password'].includes(location.pathname);
  
  if (isAuthPage) {
    return children;
  }
  
  return <PageLayout>{children}</PageLayout>;
};

function App() {
  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <NotificationProvider>
            <Routes>
              {/* Auth Routes - No Layout */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Routes with Layout */}
              <Route element={<LayoutWrapper />}>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/contact" element={<Contact />} />
                
                {/* Protected Routes */}
                <Route path="/checkout" element={
                  <PrivateRoute>
                    <Checkout />
                  </PrivateRoute>
                } />
                <Route path="/dashboard" element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                } />
                <Route path="/profile" element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                } />
                <Route path="/wishlist" element={
                  <PrivateRoute>
                    <Wishlist />
                  </PrivateRoute>
                } /> 
                <Route path="/admin/products" element={
                  <PrivateRoute adminOnly>
                    <AdminProducts />
                  </PrivateRoute>
                } />
                
                {/* 404 - Not Found */}
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </NotificationProvider>
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  );
}

export default App;
