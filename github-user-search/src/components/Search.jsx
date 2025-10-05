import React, { useState } from 'react';
import { fetchUserData, fetchAdvancedUsers } from '../services/githubService';

const Search = () => {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResults([]);
    setPage(1);

    try {
      const data = await fetchAdvancedUsers(username, location, minRepos, 1);
      setResults(data.items || []);
      setHasMore(data.total_count > data.items.length);
    } catch (err) {
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    const nextPage = page + 1;
    setLoading(true);

    try {
      const data = await fetchAdvancedUsers(username, location, minRepos, nextPage);
      setResults(prev => [...prev, ...data.items]);
      setPage(nextPage);
      setHasMore(data.total_count > results.length + data.items.length);
    } catch {
      setError("Failed to load more users.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4">
      {/* Advanced Search Form */}
      <form
        onSubmit={handleSearch}
        className="bg-white shadow-md rounded-xl p-6 mb-8 space-y-4 md:space-y-0 md:flex md:flex-wrap md:gap-4"
      >
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Search by username"
          className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location (e.g. Ghana)"
          className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          placeholder="Min repos"
          className="w-40 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-5 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition"
        >
          Search
        </button>
      </form>

      {/* Loading State */}
      {loading && <p className="text-center text-gray-500">Loading...</p>}

      {/* Error */}
      {error && <p className="text-center text-red-500 font-medium">{error}</p>}

      {/* Results List */}
      <div className="space-y-4">
        {results.map(user => (
          <div
            key={user.id}
            className="flex items-center bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
          >
            <img
              src={user.avatar_url}
              alt={`${user.login} avatar`}
              className="w-16 h-16 rounded-full mr-4 object-cover border-2 border-blue-500"
            />
            <div>
              <h3 className="text-xl font-semibold">{user.login}</h3>
              {user.location && <p className="text-gray-600">{user.location}</p>}
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-sm hover:underline"
              >
                View Profile
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && !loading && (
        <div className="text-center mt-6">
          <button
            onClick={loadMore}
            className="px-5 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Search;
