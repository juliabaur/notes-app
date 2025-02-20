import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(); // sign in user
    navigate('/signin'); // directing to sign in page
  };

  return (
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        {user ? (
          <>
            <li><a href="/notes">Notes</a></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><a href="/signin">Sign In</a></li>
            <li><a href="/register">Register</a></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
