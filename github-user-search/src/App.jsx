import React, { useState } from 'react';
// Assuming lucide-react icons are available in this environment.
import { Search, Info, Github, Users, TrendingUp } from 'lucide-react';

// --- START: API Service Logic ---

const API_BASE_URL = 'https://api.github.com/users';

/**
 * Fetches user data from the GitHub API based on the provided username.
 */
const fetchUserData = async (username) => {
    // FIX: Using the injected environment variable directly via the expected global name.
    const GITHUB_TOKEN = typeof VITE_APP_GITHUB_API_KEY !== 'undefined' ? VITE_APP_GITHUB_API_KEY : ''; 

    if (!username) return null;
    
    const url = `${API_BASE_URL}/${username}`;
    
    const headers = {
        'Accept': 'application/vnd.github.v3+json',
    };

    if (GITHUB_TOKEN) {
        headers['Authorization'] = `token ${GITHUB_TOKEN}`;
    }

    try {
        const response = await fetch(url, { headers });

        if (response.status === 404) {
            return null; // User not found
        }

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
        }

        return await response.json();

    } catch (error) {
        throw new Error(error.message || "A network error occurred while fetching data.");
    }
};

// --- END: API Service Logic ---

// --- START: UserProfileCard Component ---

/**
 * Displays the key details of a GitHub user.
 */
const UserProfileCard = ({ user }) => {
    if (!user) return null;

    const displayName = user.name || 'N/A';

    return (
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-xl max-w-lg w-full transform transition duration-500 hover:shadow-2xl hover:scale-[1.02] mt-8 border-t-4 border-indigo-600">
            <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-6">
                {/* Avatar */}
                <img 
                    src={user.avatar_url || 'https://placehold.co/128x128/4F46E5/ffffff?text=No+Avatar'} 
                    alt={`${user.login}'s avatar`} 
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full ring-4 ring-indigo-600 shadow-lg object-cover mb-4 md:mb-0"
                    onError={(e) => e.target.src = 'https://placehold.co/128x128/4F46E5/ffffff?text=No+Avatar'}
                />
                
                <div className="text-center md:text-left flex-1">
                    {/* Name/Username */}
                    <h2 className="text-3xl font-extrabold text-gray-900 leading-tight">
                        {displayName}
                    </h2>
                    <p className="text-xl text-indigo-600 font-semibold mb-2">
                        @{user.login}
                    </p>

                    {/* Bio/Description */}
                    {user.bio && (
                         <p className="text-gray-600 italic mt-1 max-w-xs">{user.bio}</p>
                    )}

                    {/* Stats and Link */}
                    <div className="flex space-x-4 mt-4 justify-center md:justify-start text-sm text-gray-700 font-medium">
                        <span className="flex items-center">
                            <TrendingUp className="w-4 h-4 mr-1 text-gray-500" />
                            <span className="text-indigo-600 font-bold">{user.public_repos} Repos</span>
                        </span>
                        <span className="flex items-center">
                            <Users className="w-4 h-4 mr-1 text-gray-500" />
                            <span className="text-indigo-600 font-bold">{user.followers} Followers</span>
                        </span>
                    </div>

                    <a
                        href={user.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center mt-4 px-5 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-150 text-sm"
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

// --- START: SearchFeature Component (Encapsulates all search logic) ---



// --- END: SearchFeature Component ---


// --- Home Page Component (Renders the SearchFeature) ---

const HomePage = ({ navigate }) => {
    return (
        <div className="p-8 rounded-xl bg-white shadow-xl border-t-8 border-indigo-100">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-4 flex items-center">
              <Search className="w-7 h-7 mr-3 text-indigo-600" />
              GitHub User Search
            </h2>
            <p className="text-gray-600 mb-6">
              Welcome! Enter a GitHub username below to retrieve their profile details and statistics.
            </p>
            
            {/* Rendering the dedicated Search component */}
            <SearchFeature /> 
            
            <div className="mt-8 pt-6 border-t border-gray-100">
                <p className="text-sm text-gray-400">
                    Current view: <span className="font-mono text-xs text-indigo-500 bg-indigo-50 px-1 py-0.5 rounded">/</span>
                </p>
            </div>
        </div>
    );
};

// --- About Page Component ---
const AboutPage = () => (
  <div className="bg-white p-8 rounded-xl shadow-xl border-t-8 border-teal-100">
    <h2 className="text-3xl font-extrabold text-gray-800 mb-4 flex items-center">
      <Info className="w-7 h-7 mr-3 text-teal-600" />
      About This Application
    </h2>
    <p className="text-gray-600 mb-4">
      This application is a simple, single-page interface designed to interact with the public GitHub API. It demonstrates basic client-side routing and data fetching in a modern React structure.
    </p>
    <p className="text-gray-600 mb-6">
      It utilizes a client-side routing approach (using React state and a simple `switch` statement) to switch between views without a full page refresh. The design is implemented using **Tailwind CSS**.
    </p>
    <div className="mt-8 pt-6 border-t border-gray-100">
        <p className="text-sm text-gray-400">
            Current view: <span className="font-mono text-xs text-teal-500 bg-teal-50 px-1 py-0.5 rounded">/about</span>
        </p>
    </div>
  </div>
);

// --- Main Application Component ---

const App = () => {
    // Simple state to manage the current "path" or view
    const [currentPath, setCurrentPath] = useState('/');

    // Function to handle client-side navigation
    const navigate = (path) => {
      setCurrentPath(path);
    };

    // Component to render based on the currentPath state
    const renderView = () => {
      switch (currentPath) {
        case '/':
          return <HomePage navigate={navigate} />;
        case '/about':
          return <AboutPage />;
        default:
          // Simple 404 page
          return (
            <div className="text-center p-12 bg-white rounded-xl shadow-lg border-t-4 border-red-500">
              <h1 className="text-4xl font-black text-red-600 mb-4">404 - Not Found</h1>
              <p className="text-gray-600 mb-4">The page you're looking for doesn't exist.</p>
              <button
                onClick={() => navigate('/')}
                className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-150 font-semibold shadow-md"
              >
                Go to Home
              </button>
            </div>
          );
      }
    };

    // Reusable Navigation Link component
    const NavLink = ({ path, label, icon: Icon, isActive }) => (
      <button
        onClick={() => navigate(path)}
        className={`
          px-3 py-2 rounded-lg text-sm font-medium transition duration-200 
          flex items-center space-x-1.5
          ${isActive 
            ? 'bg-indigo-600 text-white shadow-lg' 
            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
          }
        `}
      >
        <Icon className="w-4 h-4" />
        <span>{label}</span>
      </button>
    );
    
    // Navigation Bar Component
    const Header = () => (
      <header className="bg-gray-800 shadow-xl sticky top-0 z-10">
        <div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          <div
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 cursor-pointer transition transform hover:scale-[1.01]"
          >
            <Github className="w-8 h-8 text-white" />
            <h1 className="text-2xl font-bold text-white tracking-wider">GitHub Explorer</h1>
          </div>
          
          <nav className="flex space-x-4">
            <NavLink path="/" label="Search" icon={Search} isActive={currentPath === '/'} />
            <NavLink path="/about" label="About" icon={Info} isActive={currentPath === '/about'} />
          </nav>
        </div>
      </header>
    );

    return (
      <div className="min-h-screen bg-gray-100 font-sans antialiased">
        <Header />
        
        {/* Main content container, fluid width */}
        <main className="container mx-auto p-4 md:p-8 pt-10 flex justify-center">
          <div className="w-full max-w-4xl">
            {renderView()}
          </div>
        </main>
        
        {/* Simple Footer */}
        <footer className="w-full py-4 text-center text-xs text-gray-500 border-t mt-12">
          &copy; {new Date().getFullYear()} GitHub Explorer. Powered by the GitHub API.
        </footer>
      </div>
    );
};

export default App;
