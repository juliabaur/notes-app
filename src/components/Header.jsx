import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or App Title */}
        <h1 className="text-xl font-bold sm:text-2xl md:text-3xl">My Notes App</h1>

        {/* Navigation and Sign In/Sign Out */}
        <div className="navbar-end gap-8">
          {/* Home Link */}
          <Link to="/" className="text-[#517B5D] hover:text-gray-400">
            Home
          </Link>

          {user ? (
            <>
              {/* My Notes Link */}
              <Link to="/notes" className="text-[#517B5D] hover:text-gray-400">
                My Notes
              </Link>

              {/* Sign Out Button */}
              <button
                onClick={logout}
                className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-400"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              {/* Sign In Link */}
              <Link to="/signin" className="text-[#517B5D] hover:text-gray-400">
                Sign In
              </Link>

              {/* Register Link */}
              <Link to="/register" className="text-[#517B5D] hover:text-gray-400">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
