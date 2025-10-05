import React, { useState } from 'react';
import { fetchUserData } from '@/services/githubService';
import UserProfileCard from './UserProfileCard';

const Search = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null);
    setUserData(null);

    if (!username.trim()) {
      setError('Please enter a username');
      return;
    }

    setLoading(true);
    try {
      const data = await fetchUserData(username.trim());
      setUserData(data);
    } catch (err) {
      setError("Looks like we can't find the user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-8">
      {/* Search Form */}
      <form onSubmit={handleSearch} className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="flex-grow p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
        />
        <button
          type="submit"
          className="px-4 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
        >
          Search
        </button>
      </form>

      {/* Loading State */}
      {loading && (
        <p className="mt-6 text-center text-indigo-500 font-medium">Loading...</p>
      )}

      {/* Error State */}
      {error && !loading && (
        <p className="mt-6 text-center text-red-600 font-medium">{error}</p>
      )}

      {/* User Data */}
      {userData && !loading && <UserProfileCard user={userData} />}
    </div>
  );
};

export default Search;
