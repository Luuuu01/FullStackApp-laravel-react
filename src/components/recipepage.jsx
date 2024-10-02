import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './css/recipePage.css'; 

const RecipePage = () => {
  const { id } = useParams(); 
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        console.log('Fetching all recipes...');
        const response = await axios.get("/api/recipes/all");
        console.log('Response data:', response.data); // Log the full response data
        const recipeData = response.data.data.find(recipe => recipe.id === parseInt(id));
        console.log('Found recipe:', recipeData); // Log the found recipe
        setRecipe(recipeData);
      } catch (err) {
        console.error('Error fetching recipe:', err); // Log the error
        setError('Failed to fetch recipe');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    console.log('Loading...'); // Log loading state
    return <p className="loading">Loading...</p>;
  }
  if (error) {
    console.error('Error state:', error); // Log error state
    return <p className="error">{error}</p>;
  }
  if (!recipe) {
    console.warn('No recipe found for ID:', id); // Log if no recipe is found
    return <p className="not-found">Recipe not found</p>;
  }

  return (
    <div className="recipe-container">
      <h1 className="recipe-title">{recipe.name}</h1>
      <img className="recipe-image" src={`http://localhost:8000/storage/${recipe.slika}`} alt={recipe.name} />
      <div className="recipe-details">
        <h2 className="ingredients-title">Sastojci:</h2>
        <ul className="ingredients-list">
          {recipe.ingredients.map((sastojak) => (
            <li key={sastojak.id}>{sastojak.name}</li>
          ))}
        </ul>
        <h2 className="instructions-title">Kako se pravi:</h2>
        <div className="instructions" dangerouslySetInnerHTML={{ __html: recipe.opis }} />
      </div>
    </div>
  );
};

export default RecipePage;
