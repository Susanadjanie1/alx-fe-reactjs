import React from 'react';
import { useParams, Link } from 'react-router-dom';
import useRecipeStore from '../store/recipeStore';
import EditRecipeForm from './EditRecipeForm';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeDetails = () => {
  const { recipeId } = useParams();
  const recipes = useRecipeStore(state => state.recipes);
  const favorites = useRecipeStore(state => state.favorites);
  const addFavorite = useRecipeStore(state => state.addFavorite);
  const removeFavorite = useRecipeStore(state => state.removeFavorite);

  const recipe = recipes.find(r => r.id === parseInt(recipeId));

  if (!recipe) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Recipe not found.</div>;
  }

  const isFavorite = favorites.includes(recipe.id);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFavorite(recipe.id);
    } else {
      addFavorite(recipe.id);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <Link to="/" style={{ textDecoration: 'none', color: '#007BFF', fontWeight: 'bold' }}>&lt; Back to all Recipes</Link>
      <div style={{ border: '2px solid #ddd', borderRadius: '12px', padding: '30px', marginTop: '20px', backgroundColor: '#f9f9f9', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '2.5em', margin: '0', color: '#333' }}>{recipe.title}</h1>
          <button
            onClick={handleFavoriteClick}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '2.5em',
              color: isFavorite ? '#FFD700' : '#ccc',
            }}
          >
            {isFavorite ? '★' : '☆'}
          </button>
        </div>
        <p style={{ fontSize: '1.1em', lineHeight: '1.6', color: '#555', marginTop: '15px' }}>{recipe.description}</p>
        <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
          <EditRecipeForm recipe={recipe} />
          <DeleteRecipeButton recipeId={recipe.id} />
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
