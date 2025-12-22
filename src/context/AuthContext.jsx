import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const loadUser = async () => {
    try {
      const response = await api.get('/users/profile');
      // FIX: Ensure user has id field
      const userData = response.data;
      if (userData && !userData.id && userData._id) {
        userData.id = userData._id;
      }
      setUser(userData);
      console.log('User loaded:', userData);
    } catch (error) {
      console.error('Failed to load user:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    const { token: newToken, user: userData } = response.data;
    
    // FIX: Ensure user has id field
    if (userData && !userData.id && userData._id) {
      userData.id = userData._id;
    }
    
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(userData);
    console.log('User logged in:', userData);
    
    return response.data;
  };

  const register = async (username, email, password) => {
    const response = await api.post('/auth/register', { username, email, password });
    const { token: newToken, user: userData } = response.data;
    
    // FIX: Ensure user has id field
    if (userData && !userData.id && userData._id) {
      userData.id = userData._id;
    }
    
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(userData);
    console.log('User registered:', userData);
    
    return response.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    login,
    register,
    logout,
    isAuthenticated: !!token,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
