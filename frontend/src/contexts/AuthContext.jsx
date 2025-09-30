import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is logged in on initial load
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email, password) => {
    // TODO: Replace with actual API call
    console.log('Logging in with:', { email, password });
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock admin user for demo purposes
    const isAdmin = email === 'admin@example.com';
    const mockUser = {
      id: isAdmin ? 'admin-1' : 'user-1',
      email,
      name: isAdmin ? 'Admin User' : 'Test User',
      role: isAdmin ? 'admin' : 'user',
      token: 'mock-jwt-token'
    };
    
    localStorage.setItem('user', JSON.stringify(mockUser));
    setCurrentUser(mockUser);
    return mockUser;
  };

  // Register function
  const register = async (userData) => {
    // TODO: Replace with actual API call
    console.log('Registering user:', userData);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user data
    const mockUser = {
      id: `user-${Math.floor(Math.random() * 1000)}`,
      email: userData.email,
      name: userData.name,
      role: 'user', // New users are regular users by default
      token: 'mock-jwt-token'
    };
    
    localStorage.setItem('user', JSON.stringify(mockUser));
    setCurrentUser(mockUser);
    return mockUser;
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
    navigate('/login');
  };

  // Forgot password function
  const forgotPassword = async (email) => {
    // TODO: Replace with actual API call
    console.log('Sending password reset email to:', email);
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true };
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    forgotPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
