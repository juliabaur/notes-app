import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="flex gap-12 items-center">
      <Link to="/" className="hover:text-gray-400">Home</Link>
      {user ? (
        <>
          <Link to="/notes" className="hover:text-gray-400">Notes</Link>
          <button onClick={logout} className="hover:text-gray-400">Sign Out</button>
        </>
      ) : (
        <>
          <Link to="/signin" className="hover:text-gray-400">Sign In</Link>
          <Link to="/register" className="hover:text-gray-400">Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
