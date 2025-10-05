import React, { useState } from 'react';

// --- START: Service Logic (Internalized fetchUserData) ---

// API_BASE_URL remains constant
const API_BASE_URL = 'https://api.github.com/users';

/**
 * Fetches user data from the GitHub API based on the provided username.
 */
const fetchUserData = async (username) => {
    // FIX: Changing to process.env access, which is often a compatible fallback 
    // for environment variable substitution in older JS targets where import.meta.env causes warnings.
    const GITHUB_TOKEN = process.env.VITE_APP_GITHUB_API_KEY; 

    if (!username) return null;
    
    const url = `${API_BASE_URL}/${username}`;
    
    const headers = {
        'Accept': 'application/vnd.github.v3+json',
    };

    // Use token for authenticated requests if available
    if (GITHUB_TOKEN) {
        headers['Authorization'] = `token ${GITHUB_TOKEN}`;
    }

    try {
        const response = await fetch(url, { headers });

        if (response.status === 404) {
            return null; // User not found
        }

        if (!response.ok) {
            // General API error (e.g., rate limit, server error)
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
        }

        return await response.json();

    } catch (error) {
        // Network errors
        throw new Error(error.message || "A network error occurred while fetching data.");
    }
};

// --- END: Service Logic ---

// --- START: UserProfileCard Component (Internalized) ---

/**
 * Displays the key details of a GitHub user.
 */
const UserProfileCard = ({ user }) => {
    if (!user) return null;

    return (
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-xl max-w-lg w-full transform transition duration-500 hover:shadow-2xl hover:scale-[1.02] mt-8 border-t-4 border-blue-500">
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
                        {user.name || 'N/A'}
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
                        <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20v-2A3 3 0 015 14.864M7 20h10V4A2 2 0 0015 2H9a2 2 0 00-2 2v16zM3 20h4M3 10h4M3 6h4M17 6h4m-4 4h4"></path></svg>
                            <span className="text-blue-600 font-bold">{user.public_repos} Repos</span>
                        </span>
                        <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M12 20.781l7.74-7.74a5.25 5.25 0 00-7.74-7.74l-.26.26-.26-.26a5.25 5.25 0 00-7.74 7.74l7.74 7.74z"></path></svg>
                            <span className="text-blue-600 font-bold">{user.followers} Followers</span>
                        </span>
                    </div>

                    <a
                        href={user.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center mt-4 px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-150 text-sm"
                    >
                        Visit Profile
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                    </a>
                </div>
            </div>
        </div>
    );
};

// --- END: UserProfileCard Component ---

/**
 * The main application component, acting as both the router/layout and the UserSearch functionality.
 */
const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        
        // 1. Reset states
        setUserData(null);
        setError(null);

        if (!searchTerm.trim()) {
            setError('Please enter a GitHub username.');
            return;
        }

        setLoading(true);
        
        try {
            // 2. API Integration
            const data = await fetchUserData(searchTerm.trim());
            
            if (data === null) {
                // Specific error for 404 (user not found)
                setError('Looks like we can\'t find the user.');
            } else {
                setUserData(data);
            }
        } catch (err) {
            // 3. General API or network error
            setError(`Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 font-inter">
            {/* Header/Title */}
            <header className="w-full max-w-3xl py-6 mb-8 text-center">
                <h1 className="text-4xl font-black text-gray-800 tracking-tight">
                    GitHub User Search
                </h1>
                <p className="text-gray-500 mt-2">Find and view profiles using the GitHub API.</p>
            </header>

            <main className="w-full flex flex-col items-center">
                
                {/* Search Form */}
                <form onSubmit={handleSearch} className="w-full max-w-lg bg-white p-6 rounded-xl shadow-lg border border-gray-100 transition duration-300 hover:shadow-xl">
                    <div className="flex space-x-3">
                        <input
                            type="text"
                            placeholder="Enter GitHub Username (e.g., octocat)"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-700 transition duration-150 shadow-inner"
                            disabled={loading}
                        />
                        <button
                            type="submit"
                            className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 disabled:bg-blue-400 transition duration-150 transform hover:scale-[1.02] active:scale-[0.98]"
                            disabled={loading}
                        >
                            Search
                        </button>
                    </div>
                </form>

                {/* Status and Results Display */}
                <div className="mt-8 w-full max-w-lg flex justify-center text-center">
                    {/* Loading State */}
                    {loading && (
                        <div className="flex items-center space-x-2 text-xl text-blue-500 font-medium p-4 rounded-lg bg-white shadow-md">
                            <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Loading...</span>
                        </div>
                    )}
                    
                    {/* Error State */}
                    {error && !loading && (
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-md max-w-sm" role="alert">
                            <p className="font-bold">Search Failed</p>
                            <p className="text-sm">{error}</p>
                        </div>
                    )}
                    
                    {/* Results Display */}
                    {userData && !loading && !error && (
                        <UserProfileCard user={userData} />
                    )}
                </div>
            </main>
        </div>
    );
};

export default App;
