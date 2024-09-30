import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import styles
import styles from './css/AddRecipe.module.css';

const AddRecipe = () => {
  const [opis, setOpis] = useState('');

  const [recipe, setRecipe] = useState({
    name: '',
    description: '',
    prep_time: '',
    slika: null,
    ingredients: [],
  });

  const [availableIngredients, setAvailableIngredients] = useState([]);
  const [selectedIngredientId, setSelectedIngredientId] = useState('');
  const [ingredientQuantity, setIngredientQuantity] = useState('');
  const [uploadedImage, setUploadedImage] = useState(''); // State to hold the uploaded image URL

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await axios.get('api/ingredients');
        if (response.data && Array.isArray(response.data.data)) {
          setAvailableIngredients(response.data.data);
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

  const handleEditorChange = (value) => {
    setOpis(value);
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
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: newIngredients,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', recipe.name);
    formData.append('description', recipe.description);
    formData.append('prep_time', recipe.prep_time);
    formData.append('opis', opis); // Add the opis content to formData
    formData.append('slika', recipe.slika);
    
    recipe.ingredients.forEach((ingredient, index) => {
      formData.append(`ingredients[${index}][id]`, ingredient.id);
      formData.append(`ingredients[${index}][quantity]`, ingredient.quantity);
    });
    
    try {
      const response = await axios.post('api/recipes', formData, {
        headers: {
          Authorization: `Bearer ${window.sessionStorage.getItem('auth_token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Recipe created:', response.data);
      const imagePath = response.data.recipe.slika; // Assuming this returns the relative path
      setUploadedImage(`${imagePath}`); // Combine to form full URL
    } catch (error) {
      console.error('Error creating recipe:', error.response?.data || error.message);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    multiple: false,
    onDrop: (acceptedFiles) => {
      setRecipe((prevRecipe) => ({
        ...prevRecipe,
        slika: acceptedFiles[0],
      }));
      const previewUrl = URL.createObjectURL(acceptedFiles[0]);
      setUploadedImage(previewUrl);
    },
  });

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

        {/* React Quill Editor for Additional Description */}
        <ReactQuill
          value={opis}
          onChange={handleEditorChange}
          modules={{
            toolbar: [
              [{ 'header': [1, 2, 3, 4, false] }],
              ['bold', 'italic', 'underline'],
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
              [{ 'align': [] }], // Alignment options (left, center, right)
              ['link', 'image'],
            ],
          }}
          style={{ height: '300px' }}
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
        {/* Display Uploaded Image */}
        {uploadedImage && (
          <div className={styles.imagePreview}>
            <h4>Uploaded Image:</h4>
            <img src={uploadedImage} alt="Recipe" className={styles.image} />
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
          value={ingredientQuantity}
          onChange={(e) => setIngredientQuantity(e.target.value)}
          placeholder="Quantity"
          className={styles.inputField}
        />
        <button type="button" onClick={addIngredient} className={styles.addIngredientButton}>Add Ingredient</button>

        <div className={styles.ingredientsList}>
          {recipe.ingredients.map((ingredient, index) => {
            const ingredientName = availableIngredients.find(ing => ing.id === Number(ingredient.id))?.name;
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
