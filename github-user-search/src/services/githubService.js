import axios from 'axios';

// Create axios instance with GitHub API configuration
const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    'Accept': 'application/vnd.github.v3+json',
  },
  timeout: 10000,
});

/**
 * Fetch single user data from GitHub API
 */
export const fetchUserData = async (username) => {
  try {
    if (!username || typeof username !== 'string' || username.trim() === '') {
      throw new Error('Username must be a non-empty string');
    }

    const response = await githubApi.get(`/users/${username.trim()}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error(`Looks like we cant find the user "${username}"`);
    }
    throw new Error(error.message || 'Failed to fetch user data');
  }
};

/**
 * Advanced search for users with multiple criteria
 */
export const advancedSearchUsers = async (searchParams) => {
  try {
    const {
      username = '',
      location = '',
      minRepos = 0,
      sort = 'best-match',
      page = 1,
      perPage = 8
    } = searchParams;

    // Build GitHub search query
    let queryParts = [];
    
    if (username.trim()) {
      queryParts.push(`${username.trim()} in:login`);
    }
    
    if (location.trim()) {
      queryParts.push(`location:"${location.trim()}"`);
    }
    
    if (minRepos > 0) {
      queryParts.push(`repos:>=${minRepos}`);
    }
    
    // If no specific criteria, search for all users
    if (queryParts.length === 0) {
      queryParts.push('type:user');
    }

    const query = queryParts.join(' ');
    
    // Build sort parameter
    let sortParam = '';
    switch (sort) {
      case 'followers':
        sortParam = 'followers';
        break;
      case 'repositories':
        sortParam = 'repositories';
        break;
      case 'joined':
        sortParam = 'joined';
        break;
      default:
        sortParam = '';
    }

    const params = {
      q: query,
      per_page: perPage,
      page: page,
      ...(sortParam && { sort: sortParam })
    };

    console.log('Search params:', params);

    const response = await githubApi.get('/search/users', { params });
    
    // Fetch detailed info for each user
    if (response.data.items && response.data.items.length > 0) {
      const userPromises = response.data.items.map(user => 
        fetchUserData(user.login).catch(() => null)
      );
      const users = await Promise.all(userPromises);
      const validUsers = users.filter(user => user !== null);
      
      return {
        users: validUsers,
        totalCount: response.data.total_count,
        page: page,
        perPage: perPage,
        totalPages: Math.ceil(response.data.total_count / perPage)
      };
    }
    
    return {
      users: [],
      totalCount: 0,
      page: page,
      perPage: perPage,
      totalPages: 0
    };
  } catch (error) {
    console.error('Advanced search error:', error);
    
    if (error.response?.status === 422) {
      throw new Error('Invalid search parameters. Please adjust your criteria.');
    }
    if (error.response?.status === 403) {
      throw new Error('API rate limit exceeded. Please try again later.');
    }
    throw new Error(error.message || 'Failed to search users');
  }
};

/**
 * Get rate limit information
 */
export const getRateLimit = async () => {
  try {
    const response = await githubApi.get('/rate_limit');
    return response.data;
  } catch (error) {
    return null;
  }
};

export const GITHUB_SEARCH_API = 'https://api.github.com/search/users?q';