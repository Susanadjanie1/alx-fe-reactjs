import React, { useState } from 'react';
import useRecipeStore from './recipeStore';

const RecipeList = () => {
  const recipes = useRecipeStore(state => state.recipes);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h2 style={{ color: '#333', borderBottom: '2px solid #ddd', paddingBottom: '10px' }}>Recipes</h2>
      
      {recipes.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Search recipes by title or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontSize: '14px',
              boxSizing: 'border-box'
            }}
          />
          {searchTerm && (
            <p style={{ 
              color: '#666', 
              fontSize: '12px', 
              margin: '5px 0 0 0' 
            }}>
              Found {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? 's' : ''} matching "{searchTerm}"
            </p>
          )}
        </div>
      )}
      
      {recipes.length === 0 ? (
        <p style={{ color: '#555' }}>No recipes added yet. Add some using the form above!</p>
      ) : filteredRecipes.length === 0 ? (
        <p style={{ color: '#555' }}>No recipes match your search. Try a different term.</p>
      ) : (
        filteredRecipes.map((recipe) => (
          <div key={recipe.id} style={{ marginBottom: '15px', padding: '15px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
            <h3 style={{ color: '#007BFF', margin: '0 0 5px 0' }}>{recipe.title}</h3>
            <p style={{ color: '#777', margin: '0 0 5px 0' }}>{recipe.description}</p>
            {recipe.createdAt && (
              <small style={{ color: '#999', fontSize: '12px' }}>
                Added: {new Date(recipe.createdAt).toLocaleDateString()}
              </small>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;
