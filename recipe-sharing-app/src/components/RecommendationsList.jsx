import React, { useEffect } from 'react';
import useRecipeStore from '../store/recipeStore';
import { Link } from 'react-router-dom';

const RecommendationsList = () => {
  const recommendations = useRecipeStore(state => state.recommendations);
  const generateRecommendations = useRecipeStore(state => state.generateRecommendations);

  useEffect(() => {
    generateRecommendations();
  }, [generateRecommendations]);

  return (
    <div style={{ padding: '20px', backgroundColor: '#e8f4f8', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h2 style={{ color: '#333', borderBottom: '2px solid #ddd', paddingBottom: '10px' }}>Recommended for You</h2>
      {recommendations.length === 0 ? (
        <p style={{ color: '#555' }}>No recommendations at this time.</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {recommendations.map(recipe => (
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

export default RecommendationsList;
