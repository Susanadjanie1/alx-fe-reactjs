import React from 'react';

export const UserProfileCard = ({ user }) => {
  if (!user) return null;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md transform hover:scale-[1.02] transition duration-300">
      <div className="flex flex-col items-center">
        <img
          src={user.avatar_url || 'https://placehold.co/128x128/3B82F6/ffffff?text=No+Avatar'}
          alt={`${user.login}'s avatar`}
          className="w-24 h-24 rounded-full ring-4 ring-indigo-500 shadow mb-4 object-cover"
          onError={(e) =>
            (e.target.src = 'https://placehold.co/128x128/3B82F6/ffffff?text=No+Avatar')
          }
        />
        <h2 className="text-xl font-bold text-gray-900">{user.login}</h2>
        {user.name && <p className="text-gray-600">{user.name}</p>}

        <a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg shadow hover:bg-indigo-700 transition"
        >
          View Profile
        </a>
      </div>
    </div>
  );
};

export default UserProfileCard;
