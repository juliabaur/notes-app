import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Correct import of AuthContext
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const { login } = useAuth(); // Ensure you're using login here
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();
    login(email, password); // Call the login function
    navigate('/notes'); // Redirect to the notes page after successful sign-in
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;