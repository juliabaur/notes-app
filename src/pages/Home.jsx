import React from 'react';
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook to access the user context

const Home = () => {
  const { user } = useAuth(); // Get the user data from the AuthContext

  return (
    <div>
      <h2>
        {user 
          ? user.username 
            ? `Welcome to your Notes, ${user.username}!` 
            : 'Welcome to the Notes App!'
          : 'Welcome to the Notes App!'}
      </h2>
      {/* Display the appropriate welcome message based on user login and username availability */}
    </div>
  );
};

export default Home;
