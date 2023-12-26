import React, { useState } from 'react';
import JednoJelo from './jednoJelo';
import './filter.css';
import { MdOutlineKitchen,MdKitchen } from "react-icons/md";


const Filter = ({ sastojci, products }) => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const handleIngredientChange = (ingredient) => {
    if (selectedIngredients.includes(ingredient)) {
      setSelectedIngredients((prevSelected) =>
        prevSelected.filter((item) => item !== ingredient)
      );
    } else {
      setSelectedIngredients((prevSelected) => [...prevSelected, ingredient]);
    }
  };

  const renderFilteredJela = () => {
 
    const filteredJela = products.filter((jelo) => {
      return jelo.sastojci.every((sastojak) => {
        return selectedIngredients.includes(sastojak);
      });
    });
  
    console.log('Filtered Jela:', filteredJela);
  
    return filteredJela.map((jelo) => (
      <div className='JednoJeloKlasa'>
      <JednoJelo jelo={jelo}/>
      </div>
    ));
  };
  

  console.log('Selected Ingredients:', selectedIngredients);

  return (
    <div className="filter">
      <div className="checkbox-group">
        <label>Izaberite sastojke koje imate:</label>
        <div className="button-container">
          {sastojci.map((sastojak) => (
            <label key={sastojak} className="labela">
              <div className="checkbox-icon">
                <input
                  type="checkbox"
                  value={sastojak}
                  className="dugmici"
                  onChange={() => handleIngredientChange(sastojak)}
                />
                {selectedIngredients.includes(sastojak) ? (
                  <MdKitchen />
                ) : (
                  <MdOutlineKitchen />
                )}
              
              {sastojak}
              </div>
            </label>
          ))}
        </div>
      </div>
      <div className='FiltriranaJela'>
        
          {renderFilteredJela()}
          
          </div>
    </div>
  );
};

export default Filter;