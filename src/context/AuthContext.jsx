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

  // ✅ Register function inside AuthProvider
  const register = (email, password) => {
    console.log("Registering user:", email);

    // Get the existing users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Check if the email is already registered
    const userExists = existingUsers.some(user => user.email === email);
    if (userExists) {
      throw new Error("User already exists!");
    }

    // Create a new user object
    const newUser = { email, password };

    // Store new user in the users array
    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    console.log("User registered successfully:", newUser);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateEmail, updatePassword, deleteAccount, register }}>
      {children}
    </AuthContext.Provider>
  );
};
