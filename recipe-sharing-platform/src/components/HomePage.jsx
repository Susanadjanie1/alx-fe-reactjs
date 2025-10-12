import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUtensils } from "react-icons/fa";
import mockRecipes from "../data.json";
import { BiPlus } from "react-icons/bi";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetch delay
    setTimeout(() => {
      setRecipes(mockRecipes);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="text-center text-2xl p-10 font-medium">
        Loading recipes...
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-10">
      
      {/* Main Page Heading */}
      <h1
        className="text-4xl font-extrabold text-gray-800 mb-10 text-center 
                   flex items-center justify-center space-x-3"
      >
        <FaUtensils className="text-red-600 text-3xl" />
        <span>Explore Delicious Ghanaian Recipes</span>
      </h1>

      {/* Button to Add Recipe Form - Centrally positioned */}
      <div className="flex justify-end mb-8">
        <Link 
          to="/submit-recipe" // Link to the form component
          className="inline-flex items-center justify-center space-x-2 bg-indigo-600 text-white font-semibold py-3 px-8 rounded-lg 
                   text-lg hover:bg-indigo-700 transition duration-200 shadow-lg"
        >
            <BiPlus className="text-white text-3xl" />
          <span> Submit a New Recipe</span>
        </Link>
      </div>

      {/* Responsive Grid for Recipe Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {recipes.map((recipe) => (
          <Link
            key={recipe.id}
            to={`/recipe/${recipe.id}`}
            className="bg-white rounded-xl shadow-lg overflow-hidden transition duration-300 ease-in-out 
                       hover:shadow-2xl hover:scale-105 border border-gray-100 cursor-pointer block"
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

              {/* View Recipe Button */}
              <div
                className="inline-block w-full text-center px-4 py-2 bg-red-600 text-white font-medium text-base rounded-lg 
                               hover:bg-red-700 transition duration-50"
              >
                View Recipe
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;