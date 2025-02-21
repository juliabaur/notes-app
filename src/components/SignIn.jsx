import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Correct import of AuthContext
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const { login } = useAuth(); // Ensure you're using login here
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // To manage loading state
  const [error, setError] = useState(''); // For error handling

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Reset error on new attempt

    try {
      await login(email, password); // Call the login function
      navigate('/notes'); // Redirect to the notes page after successful sign-in
    } catch (err) {
      setLoading(false);
      setError('Invalid credentials. Please try again.'); // Set error message if login fails
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>
      <form onSubmit={handleSignIn} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>} {/* Display error message */}
        <button 
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
          disabled={loading} // Disable button while loading
        >
          {loading ? 'Signing In...' : 'Sign In'} {/* Change button text while loading */}
        </button>
      </form>
    </div>
  );
};

export default SignIn;
