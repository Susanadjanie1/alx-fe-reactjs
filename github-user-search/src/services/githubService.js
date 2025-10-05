import axios from 'axios';

const BASE_URL = 'https://api.github.com';

/**
 * Fetch single GitHub user by username
 */
export const fetchUserData = async (username) => {
  if (!username) return null;
  const response = await axios.get(`${BASE_URL}/users/${username}`);
  return response.data;
};

/**
 * Advanced search using GitHub Search API
 * Includes username, location, and minimum repos
 */
export const fetchAdvancedUsers = async (username = '', location = '', minRepos = 0, page = 1) => {
  let query = '';
  if (username) query += `${username} in:login`;
  if (location) query += ` location:${location}`;
  if (minRepos) query += ` repos:>=${minRepos}`;

  
  const url = `${BASE_URL}/search/users?q=${encodeURIComponent(query.trim())}&per_page=10&page=${page}`;

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
