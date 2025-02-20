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

  const signIn = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); // Save User in Local Storage
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('user'); // Remove User from Local Storage
  };

  const register = (email, password) => {
    const newUser = { email, password };
    setUser(newUser); // Set user state
    localStorage.setItem('user', JSON.stringify(newUser)); // Save user in local storage
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

export default AuthContext;