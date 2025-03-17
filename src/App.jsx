import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import AdminRoutes from './components/Admin/AdminRoutes';

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/*" element={<AdminRoutes />} />
        
        {/* Main Website Routes */}
        <Route
          path="/"
          element={
            <>
              <Header />
              <Hero />
            </>
          }
        />
      </Routes>
    </AuthProvider>
  );
};

export default App;
