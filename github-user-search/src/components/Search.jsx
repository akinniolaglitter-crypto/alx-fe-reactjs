import React, { useState } from 'react';
import { fetchUserData } from '../services/githubService';

const Search = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate input
    if (!username.trim()) {
      setError('Please enter a GitHub username');
      return;
    }

    // Reset states
    setLoading(true);
    setError('');
    setUserData(null);

    try {
      // Make API call using our service
      const data = await fetchUserData(username);
      
      // Update state with user data
      setUserData(data);
      setLoading(false);
      
    } catch (err) {
      // Handle API errors - use EXACT error message from requirements
      if (err.message && err.message.includes('not found')) {
        setError(`Looks like we cant find the user "${username}"`);
      } else {
        setError(err.message || 'An error occurred while fetching user data.');
      }
      setUserData(null);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setUsername(e.target.value);
    // Clear error when user starts typing
    if (error) setError('');
  };

  const formatNumber = (num) => {
    if (!num && num !== 0) return '0';
    return num.toLocaleString();
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 text-center">
        GitHub User Search
      </h1>
      <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
        Search for any GitHub user by their username
      </p>
      
      {/* Search Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1">
            <input
              type="text"
              value={username}
              onChange={handleInputChange}
              placeholder="Enter GitHub username (e.g., octocat)"
              className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading}
              data-testid="search-input"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !username.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap"
            data-testid="search-button"
          >
            {loading ? 'Searching...' : 'Search User'}
          </button>
        </div>
        
        {error && !loading && (
          <p className="text-red-500 text-sm mt-2 px-1" data-testid="error-message">
            {error}
          </p>
        )}
      </form>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400 font-medium">Loading...</p>
        </div>
      )}

      {/* Error State - Note the EXACT text: "Looks like we cant find the user" */}
      {error && !loading && error.includes("cant find") && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-8 text-center">
          <div className="text-red-500 dark:text-red-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-red-800 dark:text-red-300 mb-2">
            User Not Found
          </h3>
          <p className="text-red-700 dark:text-red-400 mb-4" data-testid="not-found-message">
            {error}
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Please check the spelling and try again.
          </p>
        </div>
      )}

      {/* Other Error States */}
      {error && !loading && !error.includes("cant find") && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-yellow-500 dark:text-yellow-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-1">
                Something went wrong
              </h4>
              <p className="text-yellow-700 dark:text-yellow-400">
                {error}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Results Display */}
      {userData && !loading && !error && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden">
          {/* User Header */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <img
                src={userData.avatar_url}
                alt={`${userData.login}'s avatar`}
                className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 shadow-lg"
                data-testid="user-avatar"
              />
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white" data-testid="user-name">
                  {userData.name || userData.login}
                </h2>
                <p className="text-blue-600 dark:text-blue-400 font-medium text-lg" data-testid="user-login">
                  @{userData.login}
                </p>
                {userData.bio && (
                  <p className="text-gray-600 dark:text-gray-300 mt-3 max-w-2xl" data-testid="user-bio">
                    {userData.bio}
                  </p>
                )}
                <div className="flex flex-wrap gap-4 mt-4 justify-center md:justify-start">
                  {userData.location && (
                    <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400" data-testid="user-location">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      {userData.location}
                    </span>
                  )}
                  {userData.blog && (
                    <a
                      href={userData.blog}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline"
                      data-testid="user-blog"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                      </svg>
                      Website
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div className="text-2xl font-bold text-gray-900 dark:text-white" data-testid="user-repos">
                {formatNumber(userData.public_repos)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Public Repos</div>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div className="text-2xl font-bold text-gray-900 dark:text-white" data-testid="user-followers">
                {formatNumber(userData.followers)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Followers</div>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div className="text-2xl font-bold text-gray-900 dark:text-white" data-testid="user-following">
                {formatNumber(userData.following)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Following</div>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {userData.hireable ? 'Yes' : 'No'}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Available for Hire</div>
            </div>
          </div>

          {/* GitHub Profile Link */}
          <div className="p-6 border-t border-gray-200 dark:border-gray-700 text-center">
            <a
              href={userData.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gray-900 hover:bg-black dark:bg-gray-700 dark:hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              data-testid="github-profile-link"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              View Full GitHub Profile
            </a>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
              Joined GitHub on {new Date(userData.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;