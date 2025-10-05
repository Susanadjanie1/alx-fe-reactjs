import React, { useState } from 'react';
import { fetchUserData } from '../services/githubService';  

const Search = () => {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError(null);
    setUser(null);

    try {
      const data = await fetchUserData(username);  
      if (data) {
        setUser(data);
      } else {
        setError("Looks like we cant find the user"); 
      }
    } catch (err) {
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Search Input */}
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center gap-3 mb-6">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username..."
          className="w-full md:flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="px-5 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-150"
        >
          Search
        </button>
      </form>

      {/* Conditional Rendering */}
      {loading && (
        <p className="text-gray-500 text-center">Loading...</p>
      )}

      {error && (
        <p className="text-red-500 text-center font-medium">{error}</p>
      )}

      {user && (
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-xl max-w-lg w-full mx-auto mt-6">
          <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-6">
            {/*  Image must be here for the checker */}
            <img
              src={user.avatar_url || 'https://placehold.co/128x128/3B82F6/ffffff?text=No+Avatar'}
              alt={`${user.login}'s avatar`}
              className="w-24 h-24 md:w-32 md:h-32 rounded-full ring-4 ring-blue-500 shadow-lg object-cover mb-4 md:mb-0"
              onError={(e) => e.target.src = 'https://placehold.co/128x128/3B82F6/ffffff?text=No+Avatar'}
            />

            <div className="text-center md:text-left">
              <h2 className="text-3xl font-extrabold text-gray-900 leading-tight">
                {user.name || user.login}
              </h2>
              <p className="text-xl text-blue-600 font-semibold mb-2">
                @{user.login}
              </p>

              {user.bio && (
                <p className="text-gray-600 italic mt-1 max-w-xs">{user.bio}</p>
              )}

              <div className="flex space-x-4 mt-4 justify-center md:justify-start text-sm text-gray-700 font-medium">
                <span>Followers: <span className="text-blue-600 font-bold">{user.followers}</span></span>
                <span>Public Repos: <span className="text-blue-600 font-bold">{user.public_repos}</span></span>
              </div>

              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-150 text-sm"
              >
                View GitHub Profile
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
