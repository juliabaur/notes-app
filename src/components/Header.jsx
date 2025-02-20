import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">My Notes App</h1>
        {/* Navbar content here */}
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/">Home</Link></li>
            {user ? (
              <>
                <li><Link to="/notes">My Notes</Link></li>
                <li><button onClick={logout} className="bg-red-500 px-3 py-1 rounded">Sign Out</button></li>
              </>
            ) : (
              <>
                <li><Link to="/signin">Sign In</Link></li>
                <li><Link to="/register">Register</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
