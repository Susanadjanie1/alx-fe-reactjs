import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import mockRecipes from '../data.json'; 
import { FaCarrot, FaUtensils } from 'react-icons/fa'; 

const RecipeDetail = () => {
    const { id } = useParams(); 
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const foundRecipe = mockRecipes.find(r => r.id === parseInt(id));

        setTimeout(() => {
            setRecipe(foundRecipe);
            setLoading(false);
        }, 300);
    }, [id]); 

    if (loading) {
        return <div className="text-center text-2xl p-10 font-medium">Loading recipe details...</div>;
    }

    if (!recipe) {
        return (
            <div className="text-center p-10">
                <h2 className="text-3xl font-bold text-red-600 mb-4">Recipe Not Found</h2>
                <Link to="/" className="text-indigo-600 hover:text-indigo-800 mt-4 inline-block">
                    Go back to Home
                </Link>
            </div>
        );
    }

    // Split multi-line strings from data.json into arrays for list display
    const ingredientsList = recipe.ingredients ? recipe.ingredients.split('\n').filter(item => item.trim() !== '') : [];
    const stepsList = recipe.steps ? recipe.steps.split('\n').filter(item => item.trim() !== '') : [];

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-10">
            
            {/* Back Button */}
            <Link to="/" className="text-indigo-600 hover:text-indigo-800 text-lg mb-6 inline-flex items-center">
                 <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                Back to all Recipes
            </Link>

            {/* Recipe Header and Image Container */}
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden mb-10">
                <img 
                    // Adjusted classes for object-contain to prevent cropping
                    className="w-full h-96 object-contain object-center" 
                    src={recipe.image} 
                    alt={recipe.title} 
                    loading="lazy"
                />
                <div className="p-6 md:p-10">
                    <h1 className="text-5xl font-extrabold text-gray-900 mb-3">{recipe.title}</h1>
                    <p className="text-xl text-gray-600 italic">{recipe.summary}</p>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                
                {/* Ingredients Section */}
                <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4 border-b pb-2 flex items-center">
                        <FaCarrot className="mr-2 text-orange-500" />
                        Ingredients 
                    </h2>
                    <ul className="space-y-3 text-lg text-gray-700">
                        {ingredientsList.length > 0 ? (
                            ingredientsList.map((item, index) => (
                                <li key={index} className="flex items-start">
                                    {item.trim()}
                                </li>
                            ))
                        ) : (
                            <p>No ingredients listed.</p>
                        )}
                    </ul>
                </div>

                {/* Preparation Steps Section (Includes the 'instructions' keyword) */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4 border-b pb-2 flex items-center">
                        <FaUtensils className="mr-2 text-red-600" />
                        Preparation Steps (Instructions) 
                    </h2>
                    <ol className="space-y-6 text-lg text-gray-700">
                        {stepsList.length > 0 ? (
                            stepsList.map((step, index) => (
                                <li key={index} className="flex">
                                    <span className="flex-shrink-0 w-8 h-8 text-center rounded-full bg-red-600 text-white font-bold mr-4">
                                        {index + 1}
                                    </span>
                                    <p>{step.replace(/^[0-9]\.\s*/, '').trim()}</p>
                                </li>
                            ))
                        ) : (
                            <p>No preparation steps provided.</p>
                        )}
                    </ol>
                </div>
            </div>
            
        </div>
    );
};

export default RecipeDetail;