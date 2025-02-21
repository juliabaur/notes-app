import React from 'react';
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook to access the user context

const Home = () => {
  const { user } = useAuth(); // Get the user data from the AuthContext

  return (
    <div>
      <h2>{user ? `Welcome to your Notes, ${user.username}!` : 'Welcome to the Notes App'}</h2>
      {/* Here, if the user is logged in, show their username, otherwise show the default title */}
    </div>
  );
};

export default Home;
