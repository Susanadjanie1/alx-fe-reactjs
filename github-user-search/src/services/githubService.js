import axios from 'axios';

const BASE_URL = 'https://api.github.com';

export const fetchUserData = async (username) => {
  const response = await axios.get(`${BASE_URL}/users/${username}`);
  return response.data;
};

export const fetchAdvancedUsers = async (username, location, minRepos, page = 1) => {
  let query = '';

  if (username) query += `${username} in:login`;
  if (location) query += ` location:${location}`;
  if (minRepos) query += ` repos:>=${minRepos}`;

  const response = await axios.get(`${BASE_URL}/search/users`, {
    params: {
      q: query.trim(),
      per_page: 10,
      page
    }
  });

  // Optional: fetch extra details for each user (location, repos count)
  const itemsWithDetails = await Promise.all(
    response.data.items.map(async (user) => {
      const detail = await axios.get(`${BASE_URL}/users/${user.login}`);
      return { ...user, ...detail.data };
    })
  );

  return { ...response.data, items: itemsWithDetails };
};
