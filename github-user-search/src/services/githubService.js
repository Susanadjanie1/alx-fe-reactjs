import axios from 'axios';

// Require environment variables
const BASE_URL = import.meta.env.VITE_APP_GITHUB_API_URL;
const SEARCH_ENDPOINT = import.meta.env.VITE_APP_GITHUB_SEARCH_ENDPOINT;

// Throw error if they are missing
if (!BASE_URL || !SEARCH_ENDPOINT) {
  throw new Error('Environment variables VITE_APP_GITHUB_API_URL and VITE_APP_GITHUB_SEARCH_ENDPOINT must be set');
}

// Fetch single GitHub user by username
export const fetchUserData = async (username) => {
  if (!username) return null;
  const response = await axios.get(`${BASE_URL}/users/${username}`);
  return response.data;
};

// Advanced search using GitHub Search API
export const fetchAdvancedUsers = async (username = '', location = '', minRepos = 0, page = 1) => {
  let query = '';
  if (username) query += `${username} in:login`;
  if (location) query += ` location:${location}`;
  if (minRepos) query += ` repos:>=${minRepos}`;

  const url = `${BASE_URL}${SEARCH_ENDPOINT}?q=${encodeURIComponent(query.trim())}&per_page=10&page=${page}`;

  const response = await axios.get(url);

  // Optional: fetch extra details for each user
  const itemsWithDetails = await Promise.all(
    response.data.items.map(async (user) => {
      const detail = await axios.get(`${BASE_URL}/users/${user.login}`);
      return { ...user, ...detail.data };
    })
  );

  return { ...response.data, items: itemsWithDetails };
};
