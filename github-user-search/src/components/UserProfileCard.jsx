// src/components/UserProfileCard.jsx

// Note: In a single-file environment, you would usually define this component inside App.jsx.
// We provide it here separately to adhere to the requested file structure.

import React from 'react';

/**
 * Displays the key details of a GitHub user.
 * @param {{ user: object }} props - The user data object.
 */
export const UserProfileCard = ({ user }) => {
    if (!user) return null;

    return (
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-xl max-w-lg w-full transform transition duration-500 hover:shadow-2xl hover:scale-[1.02] mt-8">
            <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-6">
                {/* Avatar */}
                <img 
                    src={user.avatar_url || 'https://placehold.co/128x128/3B82F6/ffffff?text=No+Avatar'} 
                    alt={`${user.login}'s avatar`} 
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full ring-4 ring-blue-500 shadow-lg object-cover mb-4 md:mb-0"
                    // Placeholder fallback if avatar URL fails
                    onError={(e) => e.target.src = 'https://placehold.co/128x128/3B82F6/ffffff?text=No+Avatar'}
                />
                
                <div className="text-center md:text-left">
                    {/* Name/Username */}
                    <h2 className="text-3xl font-extrabold text-gray-900 leading-tight">
                        {user.name || user.login}
                    </h2>
                    <p className="text-xl text-blue-600 font-semibold mb-2">
                        @{user.login}
                    </p>

                    {/* Bio/Description */}
                    {user.bio && (
                         <p className="text-gray-600 italic mt-1 max-w-xs">
                             {user.bio}
                         </p>
                    )}

                    {/* Stats and Link */}
                    <div className="flex space-x-4 mt-4 justify-center md:justify-start text-sm text-gray-700 font-medium">
                        <span>Followers: <span className="text-blue-600 font-bold">{user.followers}</span></span>
                        <span>Public Repos: <span className="text-blue-600 font-bold">{user.public_repos}</span></span>
                    </div>

                    <a
                        href={user.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-4 px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-150 text-sm"
                    >
                        View GitHub Profile
                    </a>
                </div>
            </div>
        </div>
    );
};

export default UserProfileCard;
