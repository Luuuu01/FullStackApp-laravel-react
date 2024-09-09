import JednoJelo from './jednoJelo';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './css/filter.css';
import { MdOutlineKitchen, MdKitchen } from "react-icons/md";

const Filter = () => {
  const [recipes, setRecipes] = useState([]);
  const [sastojci, setSastojci] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

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
        setSastojci(res.data.data);
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

  

  const renderFilteredJela = () => {
    const filteredJela = recipes.filter((jelo) => {
      // Check if all ingredients of the current jelo are in selectedIngredients
      return jelo.ingredients.every((sastojak) => {
        return selectedIngredients.includes(sastojak.name);
      });
    });

    console.log('Filtered Jela:', filteredJela);

    return filteredJela.map((jelo) => (
        <div className='JednoJeloKlasa' key={jelo.id}>
            <JednoJelo jelo={jelo} />
        </div>
    ));
};

    


  console.log('Selected Ingredients:', selectedIngredients);

  return (
    <div className="filter">
      <div className="checkbox-group">
        <label>Izaberite sastojke koje imate:</label>
        <div className="button-container">
          {sastojci.length > 0 ? (
            sastojci.map((sastojak) => (
              <label key={sastojak.id} className="labela">
                <div className="checkbox-icon">
                  <input
                    type="checkbox"
                    value={sastojak.name}
                    className="dugmici"
                    onChange={() => handleIngredientChange(sastojak.name)}
                  />
                  {selectedIngredients.includes(sastojak.name) ? (
                    <MdKitchen />
                  ) : (
                    <MdOutlineKitchen />
                  )}
                  {sastojak.name}
                </div>
              </label>
            ))
          ) : (
            <p>Loading ingredients...</p>
          )}
        </div>
      </div>
      <div className='FiltriranaJela'>
        {renderFilteredJela()}
      </div>
    </div>
  );
};

export default Filter;
