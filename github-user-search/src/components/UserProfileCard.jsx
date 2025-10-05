import React from 'react';

const UserProfileCard = ({ user }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mt-6 text-center">
      <img
        src={user.avatar_url}
        alt={`${user.login} avatar`}
        className="w-24 h-24 rounded-full mx-auto ring-4 ring-indigo-500 mb-4 object-cover"
      />
      <h2 className="text-2xl font-bold text-gray-800">{user.name || 'No Name Provided'}</h2>
      <p className="text-gray-600 mb-2">@{user.login}</p>
      <a
        href={user.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-3 px-5 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
      >
        View GitHub Profile
      </a>
    </div>
  );
};

export default UserProfileCard;
