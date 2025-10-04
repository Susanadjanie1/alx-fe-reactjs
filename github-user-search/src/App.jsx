import { useState } from 'react';
import { Search, Info, Github } from 'lucide-react';

const HomePage = ({ navigate }) => (
  <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
    <h2 className="text-3xl font-extrabold text-gray-800 mb-4 flex items-center">
      <Search className="w-7 h-7 mr-3 text-indigo-600" />
      Search GitHub Users
    </h2>
    <p className="text-gray-600 mb-6">
      Welcome! Use this page to search for any GitHub user and view their profile details and public repositories.
    </p>
    
    {/* Placeholder Search Input */}
    <div className="flex space-x-2">
      <input
        type="text"
        placeholder="Enter GitHub username..."
        className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
      />
      <button className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-150">
        Search
      </button>
    </div>
    
    <div className="mt-8 pt-6 border-t border-gray-100">
        <p className="text-sm text-gray-400">
            Current view: <span className="font-mono text-xs text-indigo-500 bg-indigo-50 px-1 py-0.5 rounded">/</span>
        </p>
    </div>
  </div>
);

// --- About Page Component ---
const AboutPage = () => (
  <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
    <h2 className="text-3xl font-extrabold text-gray-800 mb-4 flex items-center">
      <Info className="w-7 h-7 mr-3 text-teal-600" />
      About This App
    </h2>
    <p className="text-gray-600 mb-4">
      This application is a simple, single-page interface designed to interact with the public GitHub API. It demonstrates basic client-side routing and data fetching in a React environment.
    </p>
    <p className="text-gray-600 mb-6">
      The goal is to provide a clean, responsive interface to quickly look up user profiles, view key statistics, and list repositories.
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
          <div className="text-center p-12 bg-white rounded-xl shadow-lg">
            <h1 className="text-4xl font-bold text-red-500 mb-4">404</h1>
            <p className="text-gray-600">Page Not Found. Double-check the URL.</p>
            <button
              onClick={() => navigate('/')}
              className="mt-6 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-150"
            >
              Go to Home
            </button>
          </div>
        );
    }
  };

  // Navigation Bar Component
  const Header = () => (
    <header className="bg-gray-800 shadow-md">
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

  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased">
      <Header />
      
      {/* Main content container, fluid width */}
      <main className="container mx-auto p-4 md:p-8 pt-10">
        <div className="max-w-4xl mx-auto">
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
