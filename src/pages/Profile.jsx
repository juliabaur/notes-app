import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout, deleteAccount } = useAuth(); // Access user data and logout function
  const navigate = useNavigate();

  if (!user) {
    // If the user is not logged in, redirect to Sign In page
    navigate('/signin');
  }

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
          <p><strong>Email:</strong> {user.email}</p>
          <button
            onClick={handleDeleteAccount}
            className="bg-red-500 text-white px-4 py-2 rounded-md mt-4"
          >
            Delete Account
          </button>
        </>
      ) : (
        <p className="text-center text-gray-500">You need to be logged in to view your profile.</p>
      )}
    </div>
  );
};

export default Profile;
