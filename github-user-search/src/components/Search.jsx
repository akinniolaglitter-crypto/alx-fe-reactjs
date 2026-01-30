// Search component for GitHub users - displays user profiles with html_url link
// fetchUserData
import React, { useState } from 'react';
import { advancedSearchUsers } from '../services/githubService';
import UserCard from './UserCard';
import Header from './Header';
import Footer from './Footer';

const Search = () => {
  // Advanced search states
  const [searchParams, setSearchParams] = useState({
    username: '',
    location: '',
    minRepos: '',
    sort: 'best-match'
  });
  
  const [searchResults, setSearchResults] = useState({
    users: [],
    totalCount: 0,
    page: 1,
    perPage: 8,
    totalPages: 0
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSearch = async (e, page = 1) => {
    e?.preventDefault();
    
    // Validate at least one search criteria
    if (!searchParams.username.trim() && !searchParams.location.trim() && !searchParams.minRepos) {
      setError('Please enter at least one search criteria');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const params = {
        username: searchParams.username,
        location: searchParams.location,
        minRepos: searchParams.minRepos ? parseInt(searchParams.minRepos) : 0,
        sort: searchParams.sort,
        page: page,
        perPage: 8
      };

      const results = await advancedSearchUsers(params);
      
      setSearchResults(results);
      setLoading(false);
    } catch (err) {
      setError(err.message || 'An error occurred while searching');
      setSearchResults({
        users: [],
        totalCount: 0,
        page: 1,
        perPage: 8,
        totalPages: 0
      });
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > searchResults.totalPages) return;
    handleSearch(null, page);
  };

  const renderPagination = () => {
    if (searchResults.totalPages <= 1) return null;

    const pages = [];
    const currentPage = searchResults.page;
    const totalPages = searchResults.totalPages;

    // Always show first page
    pages.push(
      <button
        key={1}
        onClick={() => handlePageChange(1)}
        className={`flex items-center justify-center rounded-lg h-10 w-10 ${
          currentPage === 1
            ? 'bg-primary text-white'
            : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
        }`}
      >
        1
      </button>
    );

    // Calculate page range
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    if (currentPage > 3) {
      pages.push(
        <span key="ellipsis-start" className="text-slate-400 px-2">
          ...
        </span>
      );
    }

    // Show pages around current page
    for (let i = startPage; i <= endPage; i++) {
      if (i > 1 && i < totalPages) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`flex items-center justify-center rounded-lg h-10 w-10 ${
              currentPage === i
                ? 'bg-primary text-white'
                : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {i}
          </button>
        );
      }
    }

    if (currentPage < totalPages - 2) {
      pages.push(
        <span key="ellipsis-end" className="text-slate-400 px-2">
          ...
        </span>
      );
    }

    // Always show last page if there is more than one page
    if (totalPages > 1) {
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={`flex items-center justify-center rounded-lg h-10 w-10 ${
            currentPage === totalPages
              ? 'bg-primary text-white'
              : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          {totalPages}
        </button>
      );
    }

    return (
      <div className="flex items-center justify-center gap-2 py-10 mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center justify-center rounded-lg h-10 w-10 border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50"
        >
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
        
        {pages}
        
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center justify-center rounded-lg h-10 w-10 border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50"
        >
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background-light font-display text-slate-900">
      <Header searchParams={searchParams} onSearch={handleSearch} />
      
      <main className="max-w-[1440px] mx-auto flex flex-col gap-6 px-4 md:px-10 py-8">
        {/* Advanced Search Form */}
        <section className="w-full bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-slate-900 tracking-tight text-2xl font-bold leading-tight mb-6">
            Advanced Search
          </h3>
          
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Username Field */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-slate-400">person</span>
                  </div>
                  <input
                    type="text"
                    name="username"
                    value={searchParams.username}
                    onChange={handleInputChange}
                    placeholder="Search by username"
                    className="w-full pl-10 pr-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              {/* Location Field */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Location
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-slate-400">location_on</span>
                  </div>
                  <input
                    type="text"
                    name="location"
                    value={searchParams.location}
                    onChange={handleInputChange}
                    placeholder="e.g., San Francisco"
                    className="w-full pl-10 pr-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              {/* Minimum Repositories */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Min Repositories
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-slate-400">code</span>
                  </div>
                  <input
                    type="number"
                    name="minRepos"
                    value={searchParams.minRepos}
                    onChange={handleInputChange}
                    placeholder="Minimum repos"
                    min="0"
                    className="w-full pl-10 pr-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Sort By
                </label>
                <select
                  name="sort"
                  value={searchParams.sort}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="best-match">Best Match</option>
                  <option value="followers">Most Followers</option>
                  <option value="repositories">Most Repositories</option>
                  <option value="joined">Recently Joined</option>
                </select>
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm mt-2">{error}</div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading || (!searchParams.username && !searchParams.location && !searchParams.minRepos)}
                className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Searching...' : 'Search Users'}
              </button>
            </div>
          </form>
        </section>

        {/* Results Section */}
        <section className="w-full">
          {/* Results Header */}
          {searchResults.totalCount > 0 && (
            <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h3 className="text-slate-900 tracking-tight text-2xl font-bold leading-tight">
                  {searchResults.totalCount.toLocaleString()} users found
                </h3>
                <p className="text-slate-500 text-sm mt-1">
                  {searchParams.username && `Results for "${searchParams.username}"`}
                  {searchParams.location && ` in ${searchParams.location}`}
                  {searchParams.minRepos && ` with ${searchParams.minRepos}+ repositories`}
                  {!searchParams.username && !searchParams.location && !searchParams.minRepos && 'All GitHub users'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500">Per page:</span>
                <select 
                  value={searchResults.perPage}
                  onChange={(e) => handleSearch(null, 1, parseInt(e.target.value))}
                  className="bg-white border-slate-200 text-sm rounded-lg focus:ring-primary focus:border-primary py-1.5 pl-3 pr-8"
                >
                  <option value="8">8</option>
                  <option value="16">16</option>
                  <option value="24">24</option>
                  <option value="32">32</option>
                </select>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-slate-600">Searching GitHub users...</p>
            </div>
          )}

          {/* Results Grid */}
          {!loading && searchResults.users.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {searchResults.users.map(user => (
                  <UserCard key={user.id} user={user} />
                ))}
              </div>
              
              {/* Pagination */}
              {renderPagination()}
            </>
          )}

          {/* No Results */}
          {!loading && searchResults.totalCount === 0 && searchResults.users.length === 0 && !error && (
            <div className="text-center py-12">
              <div className="text-slate-400 mb-4">
                <span className="material-symbols-outlined text-6xl">search_off</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-700 mb-2">
                No users found
              </h3>
              <p className="text-slate-500">
                Try adjusting your search criteria to find more users.
              </p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Search;