import React from 'react';
import useRecipeStore from '../store/recipeStore';
import { Link } from 'react-router-dom';

const FavoritesList = () => {
  const favorites = useRecipeStore(state => state.favorites);
  const recipes = useRecipeStore(state => state.recipes);

  const favoriteRecipes = favorites.map(id => recipes.find(recipe => recipe.id === id)).filter(Boolean);

  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f4f8', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h2 style={{ color: '#333', borderBottom: '2px solid #ddd', paddingBottom: '10px' }}>My Favorites</h2>
      {favoriteRecipes.length === 0 ? (
        <p style={{ color: '#555' }}>You have no favorite recipes yet.</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {favoriteRecipes.map(recipe => (
            <li key={recipe.id} style={{ marginBottom: '15px', padding: '15px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
              <Link to={`/recipes/${recipe.id}`} style={{ textDecoration: 'none' }}>
                <h3 style={{ color: '#007BFF', margin: '0 0 5px 0' }}>{recipe.title}</h3>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoritesList;
