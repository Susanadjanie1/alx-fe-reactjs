import axios from 'axios';

/**
 * Retrieves the GitHub API key from environment variables.
 * In a Vite project, environment variables must be prefixed with VITE_ and accessed via import.meta.env.
 */
const GITHUB_TOKEN = import.meta.env.VITE_APP_GITHUB_API_KEY;
const API_BASE_URL = 'https://api.github.com/users';

// Create a reusable axios instance with default headers
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Accept': 'application/vnd.github.v3+json',
    ...(GITHUB_TOKEN && { Authorization: `token ${GITHUB_TOKEN}` }),
  },
});

/**
 * Fetches user data from the GitHub API based on the provided username.
 * @param {string} username - The GitHub username to search for.
 * @returns {Promise<object | null>} - The user data object, or null if the user is not found.
 * @throws {Error} - Throws an error for API request failures.
 */
export const fetchUserData = async (username) => {
  if (!username) return null;

  try {
    const response = await api.get(`/${username}`);
    return response.data;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        //  Server responded with a status code outside 2xx
        if (error.response.status === 404) {
          return null; // User not found
        }

        console.error('GitHub API Error:', error.response.data);
        throw new Error(error.response.data?.message || `HTTP error: ${error.response.status}`);
      } else if (error.request) {
        //  Request made but no response received
        console.error('No response received:', error.request);
        throw new Error('No response from GitHub API. Check your internet or API status.');
      } else {
        //  Something went wrong setting up the request
        console.error('Request setup error:', error.message);
        throw new Error(error.message);
      }
    } else {
      // Non-Axios error
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred while fetching data.');
    }
  }
};
