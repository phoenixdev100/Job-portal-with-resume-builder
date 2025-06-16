import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Configure axios defaults
axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
axios.defaults.headers.common['Content-Type'] = 'application/json';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      loadUser(token);
    } else {
      setLoading(false);
    }
  }, []);

  const loadUser = async (token) => {
    try {
      const config = {
        headers: {
          'x-auth-token': token
        }
      };
      const res = await axios.get('/api/users/profile', config);
      setUser(res.data);
    } catch (err) {
      localStorage.removeItem('token');
      setError(err.response?.data?.msg || 'Error loading user');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post('/api/users/login', { 
        email, 
        password 
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!res.data.token) {
        throw new Error('No token received from server');
      }
      
      localStorage.setItem('token', res.data.token);
      await loadUser(res.data.token);
      return true;
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      const errorMessage = err.response?.data?.msg || 
                         err.response?.data?.errors?.[0]?.msg || 
                         err.message || 
                         'Login failed';
      setError(errorMessage);
      return false;
    }
  };

  const register = async (userData) => {
    try {
      const res = await axios.post('/api/users/register', userData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!res.data.token) {
        throw new Error('No token received from server');
      }
      
      localStorage.setItem('token', res.data.token);
      await loadUser(res.data.token);
      return true;
    } catch (err) {
      console.error('Registration error:', err.response?.data || err.message);
      const errorMessage = err.response?.data?.msg || 
                         err.response?.data?.errors?.[0]?.msg || 
                         err.message || 
                         'Registration failed';
      setError(errorMessage);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        clearError
      }}
    >
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

export default AuthContext;
