import React from 'react';
import useRecipeStore from '../store/recipeStore';
import { Link } from 'react-router-dom';

const RecipeList = () => {
  const recipes = useRecipeStore(state => state.recipes);
  const searchTerm = useRecipeStore(state => state.searchTerm);

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h2 style={{ color: '#333', borderBottom: '2px solid #ddd', paddingBottom: '10px' }}>Recipes</h2>
      {filteredRecipes.length === 0 ? (
        <p style={{ color: '#555' }}>No recipes found.</p>
      ) : (
        filteredRecipes.map((recipe, index) => (
          <div key={index} style={{ marginBottom: '15px', padding: '15px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
            <Link to={`/recipes/${recipe.id}`} style={{ textDecoration: 'none' }}>
              <h3 style={{ color: '#007BFF', margin: '0 0 5px 0' }}>{recipe.title}</h3>
            </Link>
            <p style={{ color: '#777', margin: '0' }}>{recipe.description}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;
