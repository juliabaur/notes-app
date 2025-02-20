import React, { createContext, useState, useEffect, useContext } from 'react';

// Create Context
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Load user from Local Storage
    }
  }, []);

  // Register Function (Correct Placement)
  const register = (email, password) => {
    const newUser = { email, password };
    localStorage.setItem('user', JSON.stringify(newUser)); 
    setUser(newUser);
  };

  // Sign-in Function (Fixing Validation)
  const signIn = (email, password) => {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && storedUser.email === email && storedUser.password === password) {
      setUser(storedUser);
      return true; // Sign-in successful
    } else {
      return false; // Invalid credentials
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('user'); // Remove User from Local Storage
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, register }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to access AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
