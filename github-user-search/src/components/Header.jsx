import React from 'react';

const Header = ({ searchParams, onSearch }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-solid border-slate-200 bg-background-light px-4 md:px-10 py-3">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between whitespace-nowrap">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4 text-slate-900">
            <div className="size-8 flex items-center justify-center bg-slate-900 text-white rounded-lg">
              <span className="material-symbols-outlined">terminal</span>
            </div>
            <h2 className="text-slate-900 text-lg font-bold leading-tight tracking-[-0.015em]">
              GitHub Search
            </h2>
          </div>
          
          {/* Quick Search in Header */}
          <div className="hidden md:flex items-center gap-2">
            <div className="relative min-w-40 max-w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-[#92adc9]">search</span>
              </div>
              <input
                type="text"
                value={searchParams.username}
                onChange={(e) => onSearch({...searchParams, username: e.target.value})}
                placeholder="Search users..."
                className="w-full pl-10 pr-3 py-2 bg-slate-200 border-none text-slate-900 focus:ring-0 h-10 placeholder:text-slate-500 text-sm font-normal rounded-lg"
              />
            </div>
            <button
              onClick={() => onSearch()}
              className="bg-primary hover:bg-primary/90 text-white px-4 h-10 rounded-lg text-sm font-bold transition-colors"
            >
              Search
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-200 text-slate-700 transition-colors">
              <span className="material-symbols-outlined">settings</span>
            </button>
            <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-200 text-slate-700 transition-colors">
              <span className="material-symbols-outlined">notifications</span>
            </button>
          </div>
          <div 
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border border-slate-200"
            style={{
              backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDuBGgTunEyz5nSHiqFSi9Ejr2rpLg74F024b6oyM3uk3OgQ4eYhPlc0za43qXD9pRj4JJyQadP2egrcr2-AErncgXpYP6ILare1D0f7fvxVaBX1MBj0klTah7LuVVvmZx_sQc3v44aHI7hzxW82WT_ccFpmEHJMOWbWBTkGZaSrk002wyzpwFR1eQJHVcRWt9rbN4zC2wQXo6b4IU_WzlSIksmbvGHMrHQsKfBQVtVfPvfLpsLXuUZ72ZRxxiFGGBpfZcubk4-rltk")'
            }}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;