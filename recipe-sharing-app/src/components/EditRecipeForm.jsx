import React, { useState } from 'react';
import useRecipeStore from './recipeStore';
import { useNavigate } from 'react-router-dom';

const EditRecipeForm = ({ recipe }) => {
  const [title, setTitle] = useState(recipe.title);
  const [description, setDescription] = useState(recipe.description);
  const updateRecipe = useRecipeStore(state => state.updateRecipe);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    updateRecipe({ id: recipe.id, title, description });
    navigate(`/recipes/${recipe.id}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '20px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Recipe Title"
        required
        style={{
          padding: '10px',
          borderRadius: '4px',
          border: '1px solid #ddd',
          fontSize: '1em'
        }}
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Recipe Description"
        rows="4"
        required
        style={{
          padding: '10px',
          borderRadius: '4px',
          border: '1px solid #ddd',
          fontSize: '1em',
          resize: 'vertical'
        }}
      />
      <button
        type="submit"
        style={{
          padding: '10px 15px',
          borderRadius: '4px',
          border: 'none',
          backgroundColor: '#28a745',
          color: 'white',
          fontSize: '1em',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        Save Changes
      </button>
    </form>
  );
};

export default EditRecipeForm;
