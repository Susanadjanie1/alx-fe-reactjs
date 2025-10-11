import React, { useState, useEffect } from 'react';
import mockRecipes from '../data.json'; 

const HomePage = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {

        setTimeout(() => {
            setRecipes(mockRecipes);
            setLoading(false);
        }, 500); 
    }, []); 

    if (loading) {
        return <div className="text-center text-2xl p-10 font-medium">Loading recipes...</div>;
    }

    return (

        <div className="container mx-auto p-4 sm:p-6 lg:p-10">
            
            {/* Page Heading */}
            <h1 className="text-4xl font-extrabold text-gray-800 mb-10 text-center">
                Explore Delicious Ghanaian Recipes 🍴
            </h1>

            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                
                {recipes.map((recipe) => (
                    <div
                        key={recipe.id}
                        className="bg-white rounded-xl shadow-lg overflow-hidden transition duration-300 ease-in-out 
                                   hover:shadow-2xl hover:scale-105 border border-gray-100 cursor-pointer" 
                    >
                        
                        {/* Recipe Image */}
                        <img 
                            className="w-full h-48 object-cover" 
                            src={recipe.image} 
                            alt={recipe.title} 
                            loading="lazy"
                        />
                        
                        <div className="p-5">
                            {/* Recipe Title */}
                            <h2 className="text-xl font-semibold text-gray-900 mb-2 truncate">
                                {recipe.title}
                            </h2>
                            
                            {/* Recipe Summary */}
                            <p className="text-gray-600 mb-4 text-sm line-clamp-3 h-14">
                                {recipe.summary}
                            </p>
                            
                            {/* Detail Link/Button */}
                            <a 
                                href={`/recipe/${recipe.id}`} 
                                className="inline-block w-full text-center px-4 py-2 bg-red-600 text-white font-medium text-base rounded-lg 
                                           hover:bg-red-700 transition duration-50"
                            >
                                View Recipe
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;