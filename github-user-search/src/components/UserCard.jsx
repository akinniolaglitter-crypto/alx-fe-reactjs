import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserCard = ({ user }) => {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate(`/user/${user.login}`);
  };

  return (
    <div className="flex flex-col bg-white dark:bg-[#161b22] border border-slate-200 dark:border-[#233648] hover:border-primary dark:hover:border-primary rounded-xl p-5 transition-all shadow-sm">
      <div className="flex items-start gap-4 mb-4">
        <img
          src={user.avatar_url}
          alt={`${user.login}'s avatar`}
          className="size-16 rounded-lg bg-cover bg-center border border-slate-100 dark:border-slate-800 shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h4 className="text-slate-900 dark:text-white font-bold text-lg truncate">
            {user.name || user.login}
          </h4>
          <p className="text-primary text-sm font-medium">@{user.login}</p>
        </div>
      </div>
      <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2 mb-4 h-10">
        {user.bio || 'No bio available'}
      </p>
      <div className="flex flex-wrap gap-x-4 gap-y-2 mb-5">
        {user.location && (
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs">
            <span className="material-symbols-outlined text-sm">location_on</span>
            <span>{user.location}</span>
          </div>
        )}
        <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs">
          <span className="material-symbols-outlined text-sm">group</span>
          <span>{user.followers?.toLocaleString() || 0} followers</span>
        </div>
        {user.public_repos !== undefined && (
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs">
            <span className="material-symbols-outlined text-sm">code</span>
            <span>{user.public_repos} repos</span>
          </div>
        )}
      </div>
      <button
        onClick={handleViewProfile}
        className="w-full bg-slate-100 dark:bg-[#233648] hover:bg-primary hover:text-white dark:hover:bg-primary text-slate-900 dark:text-white font-bold py-2 rounded-lg text-sm transition-colors mt-auto"
      >
        View Profile
      </button>
    </div>
  );
};

export default UserCard;