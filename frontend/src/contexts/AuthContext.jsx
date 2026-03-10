import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockUsers } from '../utils/mockData';

const AuthContext = createContext(null);

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

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('oncomind_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (role) => {
    // Find mock user by role
    const mockUser = mockUsers.find(u => u.role === role);
    if (mockUser) {
      const userData = {
        id: mockUser.id,
        name: mockUser.name,
        email: mockUser.email,
        role: mockUser.role,
        token: 'mock_jwt_token_' + Date.now()
      };
      setUser(userData);
      localStorage.setItem('oncomind_user', JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, message: 'Invalid role' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('oncomind_user');
  };

  const hasRole = (roles) => {
    if (!user) return false;
    if (Array.isArray(roles)) {
      return roles.includes(user.role);
    }
    return user.role === roles;
  };

  const value = {
    user,
    loading,
    login,
    logout,
    hasRole,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

