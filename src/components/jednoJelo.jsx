import React from "react";
import "./css/jednojelo.css";
import { useNavigate } from 'react-router-dom';
import AddToCartButton from "./addToCart";

const JednoJelo = ({recipe}) => {
  const navigate = useNavigate();
  const baseURL = 'http://localhost:8000/';

  const handleClick = () => {
    navigate(`/recipe/${recipe.id}`); // Navigacija ka stranici za recept
  };

  return (
    <div className="card" style={{ margin: 25, borderStyle: "solid" }}>
      <a>
      <img className="card-img-top" src={`${baseURL}storage/${recipe.slika}`} alt={recipe.name} /> 
      </a>
      <div className="card-body">
        <h3 className="card-title">{recipe.name}</h3>
        <div className="card-text">
        <span className="prep-time">Prep time: {recipe.prep_time} min</span>
        <ul className="sastojci">
            {recipe.ingredients.map((sastojak) => (
              <li key={sastojak.id}>{sastojak.name}</li>
            ))}
              
          </ul>
          
        </div>
      </div>
      <AddToCartButton recipeId={recipe.id} />
      <button className="buttonRecipe" onClick={handleClick}>Pogledaj recept</button>
    </div>
  );
};

export default JednoJelo;