import React from 'react';
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook to access the user context

const Home = () => {
  const { user } = useAuth(); // Get the user data from the AuthContext

  return (
    <div>
      <h2>
        {user 
          ? `Welcome${user.username ? ` to your Notes, ${user.username}` : ''}!`
          : 'Welcome to the Notes App!'}
      </h2>
      {/* If the user is logged in, we greet them with their username if available */}
    </div>
  );
};

export default Home;
