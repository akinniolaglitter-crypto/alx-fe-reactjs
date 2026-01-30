import React from 'react';
import Search from './components/Search';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto">
        <Search />
        
        {/* Optional: Add some instructions */}
        <div className="max-w-2xl mx-auto mt-12 p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            How to use:
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-400">
            <li>Enter a GitHub username in the search box</li>
            <li>Click "Search User" or press Enter</li>
            <li>View the user's profile information and stats</li>
            <li>Click "View Full GitHub Profile" to visit their GitHub page</li>
          </ol>
          <div className="mt-4 text-sm text-gray-500 dark:text-gray-500">
            <p>Try searching for: octocat, google, microsoft, facebook, or your own GitHub username!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;