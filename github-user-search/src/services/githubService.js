// src/services/githubService.js

/**
 * Retrieves the GitHub API key from environment variables.
 * In a Vite project, environment variables must be prefixed with VITE_ and accessed via import.meta.env.
 */
const GITHUB_TOKEN = import.meta.env.VITE_APP_GITHUB_API_KEY;
const API_BASE_URL = 'https://api.github.com/users';

/**
 * Fetches user data from the GitHub API based on the provided username.
 * * @param {string} username The GitHub username to search for.
 * @returns {Promise<object | null>} The user data object, or null if the user is not found.
 * @throws {Error} Throws an error for API request failures (e.g., rate limiting, server error).
 */
export const fetchUserData = async (username) => {
    if (!username) return null;
    
    const url = `${API_BASE_URL}/${username}`;
    
    // Set headers for authentication (if token is provided) and to accept JSON
    const headers = {
        'Accept': 'application/vnd.github.v3+json',
    };

    if (GITHUB_TOKEN) {
        headers['Authorization'] = `token ${GITHUB_TOKEN}`;
    }

    try {
        const response = await fetch(url, { headers });

        if (response.status === 404) {
            // User not found
            return null;
        }

        if (!response.ok) {
            // Other errors (e.g., rate limit exceeded, server error)
            const errorData = await response.json();
            console.error('GitHub API Error:', errorData);
            throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
        }

        return await response.json();

    } catch (error) {
        // Network errors or specific error messages from the API
        console.error("Fetch operation failed:", error);
        throw new Error(error.message || "A network error occurred while fetching data.");
    }
};
