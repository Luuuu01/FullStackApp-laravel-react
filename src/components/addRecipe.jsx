import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './css/AddRecipe.module.css';

const AddRecipe = () => {
  const [recipe, setRecipe] = useState({
    name: '',
    description: '',
    prep_time: '',
    slika: '',
    opis: '',
    ingredients: [], // Holds objects with ingredient ID and quantity
  });

  const [availableIngredients, setAvailableIngredients] = useState([]);
  const [selectedIngredientId, setSelectedIngredientId] = useState('');
  const [ingredientQuantity, setIngredientQuantity] = useState('');

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await axios.get('api/ingredients');
        if (response.data && Array.isArray(response.data.data)) {
          setAvailableIngredients(response.data.data);
          console.log('Fetched Ingredients:', response.data.data); // Log fetched ingredients
        } else {
          console.error('Expected an array of ingredients but received:', response.data);
        }
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      }
    };

    fetchIngredients();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: value,
    }));
  };

  const addIngredient = () => {
    if (selectedIngredientId && ingredientQuantity) {
      console.log('Adding Ingredient:', selectedIngredientId, 'Quantity:', ingredientQuantity); // Log selected ingredient and quantity

      // Add the selected ingredient with its quantity to the recipe
      setRecipe((prevRecipe) => ({
        ...prevRecipe,
        ingredients: [
          ...prevRecipe.ingredients,
          { id: selectedIngredientId, quantity: ingredientQuantity },
        ],
      }));

      // Reset the selected ingredient and quantity input
      setSelectedIngredientId('');
      setIngredientQuantity('');
    }
  };

  const removeIngredient = (index) => {
    const newIngredients = recipe.ingredients.filter((_, i) => i !== index);
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: newIngredients,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting Recipe:', recipe); // Log the recipe before submission
    try {
      const response = await axios.post('api/recipes', recipe, {
        headers: {
          Authorization: `Bearer ${window.sessionStorage.getItem('auth_token')}`,
        },
      });
      console.log('Recipe created:', response.data);
    } catch (error) {
      console.error('Error creating recipe:', error.response?.data || error.message);
    }
  };

  return (
    <div className={styles.addRecipeContainer}>
      <h2>Add a New Recipe</h2>
      <form onSubmit={handleSubmit} className={styles.recipeForm}>
        <input
          type="text"
          name="name"
          value={recipe.name}
          onChange={handleChange}
          placeholder="Recipe Name"
          required
          className={styles.inputField}
        />
        <textarea
          name="description"
          value={recipe.description}
          onChange={handleChange}
          placeholder="Description"
          required
          className={styles.textareaField}
        />
        <input
          type="number"
          name="prep_time"
          value={recipe.prep_time}
          onChange={handleChange}
          placeholder="Preparation Time (minutes)"
          className={styles.inputField}
        />
        <input
          type="text"
          name="slika"
          value={recipe.slika}
          onChange={handleChange}
          placeholder="Image URL"
          className={styles.inputField}
        />
        <textarea
          name="opis"
          value={recipe.opis}
          onChange={handleChange}
          placeholder="Additional Description (optional)"
          className={styles.textareaField}
        />

        <h3>Ingredients</h3>
        <select
          value={selectedIngredientId}
          onChange={(e) => setSelectedIngredientId(e.target.value)}
          className={styles.ingredientSelect}
        >
          <option value="">Select an ingredient</option>
          {availableIngredients.map((ingredient) => (
            <option key={ingredient.id} value={ingredient.id}>
              {ingredient.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          value={ingredientQuantity}
          onChange={(e) => setIngredientQuantity(e.target.value)}
          placeholder="Quantity"
          className={styles.inputField}
        />
        <button type="button" onClick={addIngredient} className={styles.addIngredientButton}>Add Ingredient</button>

        <div className={styles.ingredientsList}>
  {recipe.ingredients.map((ingredient, index) => {
    const ingredientName = availableIngredients.find(ing => ing.id === Number(ingredient.id))?.name; // Convert to number
    console.log(`Ingredient ID: ${ingredient.id}, Ingredient Name: ${ingredientName}`);

    return (
      <div key={index} className={styles.ingredientRow}>
        <span>{ingredientName ? `${ingredientName} - ${ingredient.quantity}` : 'Unknown Ingredient'}</span>
        <button type="button" onClick={() => removeIngredient(index)} className={styles.removeButton}>Remove</button>
      </div>
    );
  })}
</div>


        <button type="submit" className={styles.submitButton}>Submit Recipe</button>
      </form>
    </div>
  );
};

export default AddRecipe;
