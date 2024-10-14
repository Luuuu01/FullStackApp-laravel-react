// src/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("auth_token")); // Use localStorage
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (token) {
      setIsAdmin(true); // Assuming the user is admin based on your login response
    } else {
      setIsAdmin(false);
    }
  }, [token]);

  const addToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem("auth_token", newToken); // Store in localStorage
  };

  const logout = async () => {
    try {
      await axios.post('/api/logout', {}, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setToken(null);
      localStorage.removeItem("auth_token"); // Remove from localStorage
      setIsAdmin(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ token, isAdmin, addToken, setIsAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};