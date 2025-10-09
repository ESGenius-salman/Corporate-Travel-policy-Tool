import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check localStorage for existing user session
    const checkAuth = () => {
      const savedUser = localStorage.getItem('currentUser');
      const sessionToken = localStorage.getItem('sessionToken');
      
      if (savedUser && sessionToken) {
        try {
          const userData = JSON.parse(savedUser);
          setUser(userData);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Error parsing user data:', error);
          localStorage.removeItem('currentUser');
          localStorage.removeItem('sessionToken');
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = (email) => {
    // Simulate login - in production, this would call an API
    const userData = {
      id: Date.now().toString(),
      name: email.split('@')[0].replace(/\./g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      email: email,
      role: 'employee',
      department: 'Engineering',
      loginTime: new Date().toISOString()
    };
    
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('currentUser', JSON.stringify(userData));
    localStorage.setItem('sessionToken', 'session-' + Date.now());
    
    // Save login history
    const loginHistory = JSON.parse(localStorage.getItem('loginHistory') || '[]');
    loginHistory.push({ email, timestamp: new Date().toISOString() });
    localStorage.setItem('loginHistory', JSON.stringify(loginHistory));
    
    return { success: true, user: userData };
  };

  const logout = () => {
    // Save logout history
    const logoutHistory = JSON.parse(localStorage.getItem('logoutHistory') || '[]');
    logoutHistory.push({
      user: user?.email,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('logoutHistory', JSON.stringify(logoutHistory));
    
    // Clear session
    localStorage.removeItem('currentUser');
    localStorage.removeItem('sessionToken');
    setUser(null);
    setIsAuthenticated(false);
    
    return { success: true };
  };

  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    login,
    logout,
    updateUser,
    loading,
    isAuthenticated
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};