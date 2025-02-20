import React, { useState, useEffect } from 'react';

const AuthContext = React.createContext();

export const useAuth = () => {
  return React.useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const register = (email, password) => {
    // Your registration logic
    const newUser = { email }; // Simplified for now
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
  };

  const login = (email, password) => {
    // Your login logic
    const loggedInUser = { email }; // Simplified for now
    localStorage.setItem('user', JSON.stringify(loggedInUser));
    setUser(loggedInUser);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
