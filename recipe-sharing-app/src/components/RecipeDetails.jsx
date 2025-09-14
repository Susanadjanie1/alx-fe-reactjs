import React from 'react';
import { useParams, Link } from 'react-router-dom';
import useRecipeStore from '../store/recipeStore';
import EditRecipeForm from './EditRecipeForm';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeDetails = () => {
  const { recipeId } = useParams();
  const recipes = useRecipeStore(state => state.recipes);

  const recipe = recipes.find(r => r.id === parseInt(recipeId));

  if (!recipe) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Recipe not found.</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <Link to="/" style={{ textDecoration: 'none', color: '#007BFF', fontWeight: 'bold' }}>&lt; Back to all Recipes</Link>
      <div style={{ border: '2px solid #ddd', borderRadius: '12px', padding: '30px', marginTop: '20px', backgroundColor: '#f9f9f9', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <h1 style={{ fontSize: '2.5em', marginBottom: '15px', color: '#333' }}>{recipe.title}</h1>
        <p style={{ fontSize: '1.1em', lineHeight: '1.6', color: '#555' }}>{recipe.description}</p>
        <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
          <EditRecipeForm recipe={recipe} />
          <DeleteRecipeButton recipeId={recipe.id} />
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
