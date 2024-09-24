import React, { useState, useEffect } from 'react';
import JednoJelo from './jednoJelo';
import axios from 'axios';
import './css/filter.css';
import { MdOutlineKitchen, MdKitchen } from "react-icons/md";

const Filter = () => {
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc'); // Stanje za sortiranje

  useEffect(() => {
    axios.get("/api/recipes")
      .then((res) => {
        console.log(res.data);
        setRecipes(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
      });
  }, []);

  useEffect(() => {
    axios.get("/api/ingredients")
      .then((res) => {
        console.log(res.data);
        setIngredients(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching ingredients:", error);
      });
  }, []);

  const handleIngredientChange = (ingredient) => {
    setSelectedIngredients((prevSelected) => 
      prevSelected.includes(ingredient)
        ? prevSelected.filter((item) => item !== ingredient)
        : [...prevSelected, ingredient]
    );
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const renderFilteredRecipes = () => {
    let filteredRecipes = recipes.filter((recipe) => {
      return recipe.ingredients.every((ingredient) => selectedIngredients.includes(ingredient.name));
    });

    // Sortiraj jela na osnovu vremena pripreme
    filteredRecipes = filteredRecipes.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.prep_time - b.prep_time;
      } else {
        return b.prep_time - a.prep_time;
      }
    });

    console.log('Filtered Recipes:', filteredRecipes);

    if (filteredRecipes.length === 0) {
      return <p>Nema recepata sa odabranim sastojcima.</p>;
    }

    return filteredRecipes.map((recipe) => (
        <JednoJelo recipe={recipe} />
    ));
  };

  console.log('Selected Ingredients:', selectedIngredients);

  return (
    <div className="container">
      
      <div className="left-column">
      <div className="sort-options">
        <label>Sort by prep time:</label>
        <select value={sortOrder} onChange={handleSortChange}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
        <label>Choose ingredients you have:</label>
        <div className="button-container">
          {ingredients.length > 0 ? (
            ingredients.map((ingredient) => (
              <label key={ingredient.id} className="labela">
                <div className="checkbox-icon">
                  <input
                    type="checkbox"
                    value={ingredient.name}
                    className="dugmici"
                    onChange={() => handleIngredientChange(ingredient.name)}
                  />
                  {selectedIngredients.includes(ingredient.name) ? (
                    <MdKitchen />
                  ) : (
                    <MdOutlineKitchen />
                  )}
                  {ingredient.name}
                </div>
              </label>
            ))
          ) : (
            <p>Loading ingredients...</p>
          )}
        </div>
      </div>

      {/* Dodaj opciju za sortiranje */}
      

      <div className='right-column'>
        {renderFilteredRecipes()}
      </div>
    </div>
  );
};

export default Filter;
