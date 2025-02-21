import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate(); // This could throw if called outside Router

  useEffect(() => {
    if (!navigate) {
      console.error("useNavigate is not available");
    }
  }, [navigate]);

  // Load user data from localStorage (if any)
  const loadUserData = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  };

  const [user, setUser] = useState(loadUserData());

  const login = (email, password) => {
    const newUser = { email, password };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    navigate('/profile');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/signin');
  };

  const updateEmail = (newEmail) => {
    if (user) {
      const updatedUser = { ...user, email: newEmail };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const updatePassword = (newPassword) => {
    if (user) {
      const updatedUser = { ...user, password: newPassword };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const deleteAccount = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/signin');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateEmail, updatePassword, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  );
};
