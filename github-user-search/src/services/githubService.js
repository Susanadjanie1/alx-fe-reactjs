// src/services/githubService.js
import axios from 'axios';

const GITHUB_TOKEN = import.meta.env.VITE_APP_GITHUB_API_KEY;
const API_BASE_URL = 'https://api.github.com';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/vnd.github.v3+json',
    ...(GITHUB_TOKEN && { Authorization: `token ${GITHUB_TOKEN}` }),
  },
});

/**
 * Search GitHub users with advanced filters.
 * @param {Object} params
 * @param {string} params.username - Partial or full username.
 * @param {string} [params.location] - User location filter.
 * @param {number} [params.minRepos] - Minimum public repos.
 */
export const searchUsers = async ({ username, location, minRepos }) => {
  if (!username && !location && !minRepos) return [];

  let query = '';

  if (username) query += `${username} in:login`;
  if (location) query += ` location:${location}`;
  if (minRepos) query += ` repos:>=${minRepos}`;

  const response = await axiosInstance.get(`/search/users?q=${encodeURIComponent(query)}`);
  return response.data.items || [];
};

/**
 * Fetch single user by username (for profile view)
 */
export const fetchUserData = async (username) => {
  const response = await axiosInstance.get(`/users/${username}`);
  return response.data;
};
