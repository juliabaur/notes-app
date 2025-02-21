import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout, deleteAccount, updateEmail, updatePassword } = useAuth(); // Access user data and functions
  const navigate = useNavigate();

  if (!user) {
    // If the user is not logged in, redirect to Sign In page
    navigate('/signin');
  }

  // Local state to handle form input
  const [newEmail, setNewEmail] = useState(user?.email || '');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (newEmail !== user.email) {
        updateEmail(newEmail); // Function to update the email
      }
      if (newPassword) {
        updatePassword(newPassword); // Function to update the password
      }
      setLoading(false);
      navigate('/profile'); // Redirect to the profile page after update
    } catch (err) {
      setLoading(false);
      setError('Failed to update profile. Please try again.');
    }
  };

  const handleDeleteAccount = () => {
    // Prompt user for confirmation before deleting account
    const confirmDelete = window.confirm('Are you sure you want to delete your account? This action is irreversible.');
    if (confirmDelete) {
      deleteAccount();
      navigate('/signin'); // Redirect to Sign In page after account is deleted
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Your Profile</h2>

      {user ? (
        <>
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="New Password (Leave blank to keep current)"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="flex items-center justify-between mt-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update Profile'}
              </button>

              <button
                onClick={handleDeleteAccount}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Delete My Profile
              </button>
            </div>
          </form>
        </>
      ) : (
        <p className="text-center text-gray-500">You need to be logged in to view your profile.</p>
      )}
    </div>
  );
};

export default Profile;
