// src/components/Search.jsx
import React, { useState } from 'react';
import { searchUsers } from '@/services/githubService';
import UserProfileCard from './UserProfileCard';

const Search = () => {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null);
    setResults([]);

    if (!username && !location && !minRepos) {
      setError('Please enter at least one search criteria.');
      return;
    }

    setLoading(true);
    try {
      const users = await searchUsers({
        username: username.trim(),
        location: location.trim(),
        minRepos: minRepos ? parseInt(minRepos) : undefined,
      });

      if (users.length === 0) {
        setError("Looks like we can't find the user. Try different criteria.");
      } else {
        setResults(users);
      }
    } catch (err) {
      setError(`API Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* 🔹 Search Form */}
      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
        />
        <input
          type="number"
          placeholder="Min Repos"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          className="p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
        />

        <button
          type="submit"
          className="md:col-span-3 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-150"
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {/* 🔸 Error */}
      {error && (
        <div className="mt-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-md">
          <p className="font-bold">Error</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* 🔹 Results */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {results.map((user) => (
          <UserProfileCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Search;
