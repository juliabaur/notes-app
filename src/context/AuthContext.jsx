import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

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
    // Simulate user authentication (you can add backend logic here)
    const storedUser = JSON.parse(localStorage.getItem('users'))?.find(
      (user) => user.email === email && user.password === password
    );

    if (storedUser) {
      setUser(storedUser);
      localStorage.setItem('user', JSON.stringify(storedUser));
      navigate('/notes'); // Redirect after successful login
    } else {
      throw new Error("Invalid email or password");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/signin'); // Redirect after logout
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
    navigate('/signin'); // Redirect after account deletion
  };

  // Register function
  const register = (email, password, username) => {
    console.log("Registering user:", email);

    // Get the existing users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the email is already registered
    const userExists = existingUsers.some((user) => user.email === email);
    if (userExists) {
      throw new Error("User already exists!");
    }

    // Create a new user object
    const newUser = { email, password, username };

    // Store the new user
    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    console.log("User registered successfully:", newUser);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateEmail, updatePassword, deleteAccount, register }}>
      {children}
    </AuthContext.Provider>
  );
};
