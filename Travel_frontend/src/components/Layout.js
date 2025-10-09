import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Navigation from './Navigation';
import { useAuth } from '../context/AuthContext';
import './Layout.css';

const Layout = ({ children }) => {
  const { loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  return (
    <div className="layout">
      <Header />
      <div className="layout-content">
        <Navigation currentPath={location.pathname} />
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;