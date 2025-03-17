import React, { createContext, useContext, useState, useEffect } from 'react';
import { isAuthenticated, setAuthenticated } from '../data/adminUser';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    // Check authentication status on mount
    setIsAuth(isAuthenticated());
  }, []);

  const login = () => {
    setAuthenticated(true);
    setIsAuth(true);
  };

  const logout = () => {
    setAuthenticated(false);
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
