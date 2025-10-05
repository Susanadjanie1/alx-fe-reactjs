import React, { useState } from 'react';
import axios from 'axios';

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
      setError('Please enter a GitHub username');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      setUserData(response.data);
    } catch (err) {
      setError("Looks like we cant find the user");
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

      {/* ❌ Error State */}
      {error && !loading && (
        <p className="mt-6 text-center text-red-600 font-medium">{error}</p>
      )}

      {/*  User Profile (inlined from UserProfileCard) */}
      {userData && !loading && !error && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow text-center">
          <img
            src={userData.avatar_url}
            alt={`${userData.login} avatar`}
            className="w-24 h-24 rounded-full mx-auto ring-4 ring-indigo-500 mb-4 object-cover"
          />
          <h2 className="text-xl font-bold text-gray-800">
            {userData.name || 'No Name Provided'}
          </h2>
          <p className="text-gray-600">@{userData.login}</p>

          <div className="flex justify-center space-x-6 mt-4 text-sm text-gray-600">
            <div>
              <span className="font-bold">{userData.public_repos}</span> Repos
            </div>
            <div>
              <span className="font-bold">{userData.followers}</span> Followers
            </div>
            <div>
              <span className="font-bold">{userData.following}</span> Following
            </div>
          </div>

          <a
            href={userData.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-5 px-5 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            View GitHub Profile
          </a>
        </div>
      )}
    </div>
  );
};

export default Search;
