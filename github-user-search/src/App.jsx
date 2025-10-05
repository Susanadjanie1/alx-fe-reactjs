// src/App.jsx
import React, { useState } from 'react';
import { Search as SearchIcon, Info, Github } from 'lucide-react';  // ⬅ Rename the icon to SearchIcon
import Search from './components/Search';  // ⬅ This is your search component
import UserProfileCard from './components/UserProfileCard';

// --- About Page Component ---
const AboutPage = () => (
  <div className="bg-white p-8 rounded-xl shadow-xl border-t-8 border-teal-100">
    <h2 className="text-3xl font-extrabold text-gray-800 mb-4 flex items-center">
      <Info className="w-7 h-7 mr-3 text-teal-600" />
      About This Application
    </h2>
    <p className="text-gray-600 mb-4">
      This application is a simple, single-page interface designed to interact with the public GitHub API. 
      It demonstrates basic client-side routing and data fetching in a modern React structure.
    </p>
    <p className="text-gray-600 mb-6">
      It uses client-side routing (via React state) to switch between views without a full page refresh.
      The design is implemented using <strong>Tailwind CSS</strong>.
    </p>
    <div className="mt-8 pt-6 border-t border-gray-100">
      <p className="text-sm text-gray-400">
        Current view: <span className="font-mono text-xs text-teal-500 bg-teal-50 px-1 py-0.5 rounded">/about</span>
      </p>
    </div>
  </div>
);

// --- Home Page Component ---
const HomePage = ({ navigate }) => {
  return (
    <div className="p-8 rounded-xl bg-white shadow-xl border-t-8 border-indigo-100">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-4 flex items-center">
        <SearchIcon className="w-7 h-7 mr-3 text-indigo-600" /> {/* ⬅ Use SearchIcon */}
        GitHub User Search
      </h2>
      <p className="text-gray-600 mb-6">
        Welcome! Enter a GitHub username below to retrieve their profile details and statistics.
      </p>

      {/* The Search Component handles API fetching */}
      <Search />

      <div className="mt-8 pt-6 border-t border-gray-100">
        <p className="text-sm text-gray-400">
          Current view: <span className="font-mono text-xs text-indigo-500 bg-indigo-50 px-1 py-0.5 rounded">/</span>
        </p>
      </div>
    </div>
  );
};

// --- Main Application Component ---
const App = () => {
  const [currentPath, setCurrentPath] = useState('/');

  const navigate = (path) => {
    setCurrentPath(path);
  };

  const renderView = () => {
    switch (currentPath) {
      case '/':
        return <HomePage navigate={navigate} />;
      case '/about':
        return <AboutPage />;
      default:
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

  const NavLink = ({ path, label, icon: Icon, isActive }) => (
    <button
      onClick={() => navigate(path)}
      className={`
        px-3 py-2 rounded-lg text-sm font-medium transition duration-200 
        flex items-center space-x-1.5
        ${isActive 
          ? 'bg-indigo-600 text-white shadow-lg' 
          : 'text-gray-300 hover:bg-gray-700 hover:text-white'}
      `}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </button>
  );

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
          <NavLink path="/" label="Search" icon={SearchIcon} isActive={currentPath === '/'} />
          <NavLink path="/about" label="About" icon={Info} isActive={currentPath === '/about'} />
        </nav>
      </div>
    </header>
  );

  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased">
      <Header />
      <main className="container mx-auto p-4 md:p-8 pt-10 flex justify-center">
        <div className="w-full max-w-4xl">
          {renderView()}
        </div>
      </main>
      <footer className="w-full py-4 text-center text-xs text-gray-500 border-t mt-12">
        &copy; {new Date().getFullYear()} GitHub Explorer. Powered by the GitHub API.
      </footer>
    </div>
  );
};

export default App;
