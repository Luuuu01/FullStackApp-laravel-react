import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DeleteRecipe = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/recipes', {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem('auth_token')}`,
          },
        });
        setRecipes(response.data.data);
      } catch (error) {
        console.error('Error fetching recipes:', error.response?.data || error.message);
      }
    };

    fetchRecipes();
  }, []);

  const deleteRecipe = async (id) => {
    try {
      await axios.delete(`api/recipes/${id}`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('auth_token')}`,
        },
      });
      setRecipes(recipes.filter(recipe => recipe.id !== id));
    } catch (error) {
      console.error('Error deleting recipe:', error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h2>Brisanje jela</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            {recipe.name}
            <button onClick={() => deleteRecipe(recipe.id)}>Obriši</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeleteRecipe;
