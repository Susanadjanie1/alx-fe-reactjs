
const SearchFeature = () => {
    // State management for the search functionality
    const [searchTerm, setSearchTerm] = useState('');
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        
        setUserData(null);
        setError(null);

        if (!searchTerm.trim()) {
            setError('Please enter a GitHub username to start the search.');
            return;
        }

        setLoading(true);
        
        try {
            const data = await fetchUserData(searchTerm.trim());
            
            if (data === null) {
                setError('Looks like we can\'t find the user or repository. Try a different username.');
            } else {
                setUserData(data);
            }
        } catch (err) {
            setError(`API Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Search Form */}
            <form onSubmit={handleSearch} className="w-full">
                <div className="flex space-x-3">
                    <input
                        type="text"
                        placeholder="Enter GitHub username (e.g., octocat)"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 transition duration-150 shadow-inner"
                        disabled={loading}
                    />
                    <button
                        type="submit"
                        className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-150 disabled:bg-indigo-400"
                        disabled={loading}
                    >
                        Search
                    </button>
                </div>
            </form>
            
            {/* Status and Results Display */}
            <div className="mt-8 flex justify-center w-full">
                {/* Loading State */}
                {loading && (
                    <div className="flex items-center space-x-2 text-xl text-indigo-500 font-medium p-4 rounded-lg bg-indigo-50 shadow-md">
                        <svg className="animate-spin h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Loading...</span>
                    </div>
                )}
                
                {/* Error State */}
                {error && !loading && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-md w-full max-w-md" role="alert">
                        <p className="font-bold">Error</p>
                        <p className="text-sm">{error}</p>
                    </div>
                )}
                
                {/* Results Display */}
                {userData && !loading && !error && (
                    <UserProfileCard user={userData} />
                )}
            </div>
        </>
    );
}