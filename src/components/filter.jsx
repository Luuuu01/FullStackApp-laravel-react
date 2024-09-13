import React, { useState, useEffect } from 'react';
import JednoJelo from './jednoJelo';
import axios from 'axios';
import './css/filter.css';
import { MdOutlineKitchen, MdKitchen } from "react-icons/md";

const Filter = () => {
  const [recipes, setRecipes] = useState([]);
  const [sastojci, setSastojci] = useState([]);
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

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const renderFilteredJela = () => {
    let filteredJela = recipes.filter((jelo) => {
      return jelo.ingredients.every((sastojak) => selectedIngredients.includes(sastojak.name));
    });

    // Sortiraj jela na osnovu vremena pripreme
    filteredJela = filteredJela.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.prep_time - b.prep_time;
      } else {
        return b.prep_time - a.prep_time;
      }
    });

    console.log('Filtered Jela:', filteredJela);

    if (filteredJela.length === 0) {
      return <p>Nema recepata sa odabranim sastojcima.</p>;
    }

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
      <div className="sort-options">
        <label>Sortiraj po vremenu pripreme:</label>
        <select value={sortOrder} onChange={handleSortChange}>
          <option value="asc">Rastuće</option>
          <option value="desc">Opadajuće</option>
        </select>
      </div>
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

      {/* Dodaj opciju za sortiranje */}
      

      <div className='FiltriranaJela'>
        {renderFilteredJela()}
      </div>
    </div>
  );
};

export default Filter;
