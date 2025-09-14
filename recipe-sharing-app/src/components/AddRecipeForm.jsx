import React, { useState } from 'react';
import useRecipeStore from './recipeStore';

const AddRecipeForm = () => {
  const addRecipe = useRecipeStore(state => state.addRecipe);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    if (!title.trim()) {
      return 'Recipe title is required';
    }
    if (title.trim().length < 3) {
      return 'Recipe title must be at least 3 characters long';
    }
    if (!description.trim()) {
      return 'Recipe description is required';
    }
    if (description.trim().length < 10) {
      return 'Recipe description must be at least 10 characters long';
    }
    return '';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);
    
    try {
      const newRecipe = {
        id: Date.now(), // Simple ID generation using timestamp
        title: title.trim(),
        description: description.trim(),
        createdAt: new Date().toISOString()
      };
      addRecipe(newRecipe);
      setTitle('');
      setDescription('');
      setError('');
    } catch (err) {
      setError(`Failed to add recipe: ${err.message || 'Please try again.'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h2 style={{ color: '#333' }}>Add a New Recipe</h2>
      
      {error && (
        <div style={{ 
          padding: '10px', 
          backgroundColor: '#fee', 
          border: '1px solid #fcc', 
          borderRadius: '4px', 
          color: '#c33',
          fontSize: '14px'
        }}>
          {error}
        </div>
      )}
      
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Recipe Title (min 3 characters)"
        style={{ 
          padding: '10px', 
          borderRadius: '4px', 
          border: '1px solid #ccc',
          fontSize: '14px'
        }}
      />
      
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Recipe Description (min 10 characters)"
        style={{ 
          padding: '10px', 
          borderRadius: '4px', 
          border: '1px solid #ccc', 
          minHeight: '80px',
          fontSize: '14px',
          resize: 'vertical'
        }}
      />
      
      <button
        type="submit"
        disabled={isSubmitting}
        style={{ 
          padding: '10px', 
          backgroundColor: isSubmitting ? '#ccc' : '#28a745', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px', 
          cursor: isSubmitting ? 'not-allowed' : 'pointer',
          fontSize: '16px',
          fontWeight: 'bold'
        }}
      >
        {isSubmitting ? 'Adding Recipe...' : 'Add Recipe'}
      </button>
    </form>
  );
};

export default AddRecipeForm;
