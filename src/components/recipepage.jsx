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
        const response = await axios.get("/api/recipes");
        const recipeData = response.data.data.find(recipe => recipe.id === parseInt(id));
        setRecipe(recipeData);
      } catch (err) {
        setError('Failed to fetch recipe');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!recipe) return <p className="not-found">Recipe not found</p>;

  return (
    <div className="recipe-container">
      <h1 className="recipe-title">{recipe.name}</h1>
      <img className="recipe-image" src={recipe.slika} alt={recipe.name} />
      <div className="recipe-details">
        <h2 className="ingredients-title">Sastojci:</h2>
        <ul className="ingredients-list">
          {recipe.ingredients.map((sastojak) => (
            <li key={sastojak.id}>{sastojak.name}</li>
          ))}
        </ul>
        <h2 className="instructions-title">Kako se pravi:</h2>
        <p className="instructions">{recipe.opis}</p>
      </div>
    </div>
  );
};

export default RecipePage;
