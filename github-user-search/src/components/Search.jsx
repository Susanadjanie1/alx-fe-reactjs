import React, { useState } from 'react';
import { fetchUserData } from '@/services/githubService';
import UserProfileCard from './UserProfileCard';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setUserData(null);
    setError(null);

    if (!searchTerm.trim()) {
      setError('Please enter a GitHub username to start the search.');
      return;
    }

    setLoading(true);
    try {
      const data = await fetchUserData(searchTerm.trim());
      if (data === null) {
        setError("Looks like we can't find the user. Try a different username.");
      } else {
        setUserData(data);
      }
    } catch (err) {
      setError(`API Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Search Form */}
      <form onSubmit={handleSearch} className="w-full">
        <div className="flex space-x-3">
          <input
            type="text"
            placeholder="Enter GitHub username (e.g., octocat)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 transition duration-150 shadow-inner"
            disabled={loading}
          />
          <button
            type="submit"
            className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-150 disabled:bg-indigo-400"
            disabled={loading}
          >
            Search
          </button>
        </div>
      </form>

      <div className="mt-8 flex justify-center w-full">
        {loading && <div className="text-indigo-500 font-medium">Loading...</div>}
        {error && !loading && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-md w-full max-w-md">
            <p className="font-bold">Error</p>
            <p className="text-sm">{error}</p>
          </div>
        )}
        {userData && !loading && !error && <UserProfileCard user={userData} />}
      </div>
    </>
  );
};

export default Search;
