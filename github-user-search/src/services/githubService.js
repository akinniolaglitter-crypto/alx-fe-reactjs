import axios from 'axios';

// Create axios instance with GitHub API configuration
const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    'Accept': 'application/vnd.github.v3+json',
  },
  timeout: 10000, // 10 second timeout
});

/**
 * Fetch user data from GitHub API
 * @param {string} username - GitHub username to search for
 * @returns {Promise} Promise resolving to user data
 */
export const fetchUserData = async (username) => {
  try {
    // Validate input
    if (!username || typeof username !== 'string') {
      throw new Error('Username must be a string');
    }

    const trimmedUsername = username.trim();
    
    if (trimmedUsername === '') {
      throw new Error('Username cannot be empty');
    }

    console.log(`Fetching data for user: ${trimmedUsername}`);
    
    // Make API call
    const response = await githubApi.get(`/users/${trimmedUsername}`);
    
    console.log('API Response:', response.data);
    return response.data;
    
  } catch (error) {
    console.error('GitHub API Error:', error);
    
    // Handle different error types
    if (error.response) {
      // GitHub API returned an error response
      const { status, data } = error.response;
      
      switch (status) {
        case 404:
          throw new Error(`Looks like we cant find the user "${username}"`);
        case 403:
          // Check if it's rate limiting
          if (data.message && data.message.includes('rate limit')) {
            throw new Error('GitHub API rate limit exceeded. Please try again in a few minutes.');
          }
          throw new Error('Access forbidden. Please check your authentication.');
        case 422:
          throw new Error('Invalid username format');
        case 500:
        case 502:
        case 503:
        case 504:
          throw new Error('GitHub API is currently unavailable. Please try again later.');
        default:
          throw new Error(`GitHub API error: ${status} - ${data.message || 'Unknown error'}`);
      }
      
    } else if (error.request) {
      // Request was made but no response received
      throw new Error('Network error. Please check your internet connection and try again.');
      
    } else {
      // Something else happened
      throw new Error(error.message || 'An unexpected error occurred');
    }
  }
};

// Optional: Add a function to check API rate limits
export const getRateLimit = async () => {
  try {
    const response = await githubApi.get('/rate_limit');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch rate limit:', error);
    return null;
  }
};

// Optional: Add a function to validate username format
export const validateUsername = (username) => {
  const githubUsernameRegex = /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/;
  return githubUsernameRegex.test(username);
};