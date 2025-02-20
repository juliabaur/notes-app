import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    // If user is not logged in, redirect to sign in page
    return <Navigate to="/signin" />;
  }

  return children; // Return children if user is authenticated
};

export default PrivateRoute;
