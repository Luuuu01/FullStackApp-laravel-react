import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { useParams } from 'react-router-dom';
import styles from './css/addRecipe.css';
import CustomHtmlEditor from './customHtmlEditor';

const EditRecipe = () => {
  const { recipeId } = useParams(); // Retrieve recipe ID from URL params
  const [recipe, setRecipe] = useState({
    name: '',
    description: '',
    prep_time: '',
    slika: null,
    ingredients: [], // Initialize as empty array
    opis: '',
  });
  const uploadUrl = "api/upload-image";
  const [availableIngredients, setAvailableIngredients] = useState([]);
  const [selectedIngredientId, setSelectedIngredientId] = useState('');
  const [ingredientQuantity, setIngredientQuantity] = useState('');
  const [uploadedImage, setUploadedImage] = useState('');

  // Fetch the existing recipe and available ingredients when the component loads
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`/api/recipes/${recipeId}`);
        const recipeData = response.data.data;

        setRecipe({
          name: recipeData.name,
          description: recipeData.description,
          prep_time: recipeData.prep_time,
          slika: recipeData.slika,
          ingredients: recipeData.ingredients || [], // Ensure it's an array
          opis: recipeData.opis,
        });

        if (recipeData.slika) {
          setUploadedImage(recipeData.slika); // Display current image if available
        }
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    const fetchIngredients = async () => {
      try {
        const response = await axios.get('/api/ingredients');
        setAvailableIngredients(response.data.data || []); // Initialize to empty array if undefined
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      }
    };

    fetchRecipe();
    fetchIngredients();
  }, [recipeId]);

  useEffect(() => {
    console.log("Current recipe state: ", recipe);
  }, [recipe]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: value,
    }));
  };

  const handleEditorChange = (content) => {
    setRecipe((prevRecipe) => ({ ...prevRecipe, opis: content }));
  };

  const addIngredient = () => {
    if (selectedIngredientId && ingredientQuantity) {
      setRecipe((prevRecipe) => ({
        ...prevRecipe,
        ingredients: [
          ...prevRecipe.ingredients,
          { id: selectedIngredientId, quantity: ingredientQuantity },
        ],
      }));
      setSelectedIngredientId('');
      setIngredientQuantity('');
    }
  };

  const removeIngredient = (index) => {
    const newIngredients = recipe.ingredients.filter((_, i) => i !== index);
    setRecipe((prevRecipe) => ({ ...prevRecipe, ingredients: newIngredients }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting recipe with name:", recipe.name); // Check the name before submitting

    // Prepare the data to be sent
    const recipeData = {
        name: recipe.name.trim(),
        description: recipe.description,
        prep_time: recipe.prep_time,
        opis: recipe.opis,
        slika: recipe.slika, // Ensure slika is correctly set (might need adjustments)
        ingredients: recipe.ingredients.map(ingredient => ({
            id: ingredient.id,
            quantity: ingredient.quantity,
        })),
    };

    try {
        const response = await axios.put(`/api/recipes/${recipeId}`, recipeData, {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem('auth_token')}`,
                'Content-Type': 'application/json', // Set the Content-Type to JSON
            },
        });
        console.log('Recipe updated:', response.data);
    } catch (error) {
        console.error('Error updating recipe:', error.response?.data || error.message);
    }
};

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    multiple: false,
    onDrop: (acceptedFiles) => {
      setRecipe((prevRecipe) => ({ ...prevRecipe, slika: acceptedFiles[0] }));
      const previewUrl = URL.createObjectURL(acceptedFiles[0]);
      setUploadedImage(previewUrl);
    },
  });

  return (
    <div className={styles.addRecipeContainer}>
      <h2>Edit Recipe</h2>
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
          value={recipe.prep_time || ''} // Ensure it's defined for the input
          onChange={handleChange}
          placeholder="Preparation Time (minutes)"
          required
          className={styles.inputField}
        />

        {/* Custom HTML Editor for Additional Description */}
        <CustomHtmlEditor
          initialValue={recipe.opis} // Pass initial value to the editor
          onChange={handleEditorChange}
          uploadUrl={uploadUrl}
        />

        {/* Dropzone for Image Upload */}
        <div {...getRootProps({ className: styles.dropzone })}>
          <input {...getInputProps()} />
          {recipe.slika ? (
            <p>{recipe.slika.name}</p>
          ) : (
            <p>Drag & drop an image here, or click to select one</p>
          )}
        </div>

        {uploadedImage && (
          <div className={styles.imagePreview}>
            <h4>Uploaded Image:</h4>
            <img src={`http://localhost:8000/storage/${recipe.slika}`} alt="Recipe" className={styles.image} />
          </div>
        )}

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
          value={ingredientQuantity || ''} // Ensure it's defined for the input
          onChange={(e) => setIngredientQuantity(e.target.value)}
          placeholder="Quantity"
          className={styles.inputField}
        />
        <button type="button" onClick={addIngredient} className={styles.addIngredientButton}>
          Add Ingredient
        </button>

        <div className={styles.ingredientsList}>
          {recipe.ingredients.map((ingredient, index) => {
            const ingredientName = availableIngredients.find(
              (ing) => ing.id === Number(ingredient.id)
            )?.name;
            return (
              <div key={index} className={styles.ingredientRow}>
                <span>
                  {ingredientName ? `${ingredientName} - ${ingredient.quantity}` : 'Unknown Ingredient'}
                </span>
                <button type="button" onClick={() => removeIngredient(index)} className={styles.removeButton}>
                  Remove
                </button>
              </div>
            );
          })}
        </div>

        <button type="submit" className={styles.submitButton}>Update Recipe</button>
      </form>
    </div>
  );
};

export default EditRecipe;
