import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
      navigate('/login');
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">✈️ Employee Travel Portal</h1>
        <div className="header-user">
          <div className="user-info" onClick={() => setShowDropdown(!showDropdown)}>
            <div className="user-avatar">{user?.name?.charAt(0) || 'U'}</div>
            <div className="user-details">
              <span className="user-name">{user?.name || 'User'}</span>
              <span className="user-role">{user?.department || 'Employee'}</span>
            </div>
            <span className="dropdown-arrow">▼</span>
          </div>
          
          {showDropdown && (
            <div className="user-dropdown">
              <div className="dropdown-item">
                <span className="dropdown-icon">👤</span>
                <span>{user?.email}</span>
              </div>
              <div className="dropdown-item">
                <span className="dropdown-icon">🏢</span>
                <span>{user?.department}</span>
              </div>
              <div className="dropdown-divider"></div>
              <div className="dropdown-item" onClick={() => navigate('/profile')}>
                <span className="dropdown-icon">⚙️</span>
                <span>Settings</span>
              </div>
              <div className="dropdown-item logout-item" onClick={handleLogout}>
                <span className="dropdown-icon">🚪</span>
                <span>Logout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;