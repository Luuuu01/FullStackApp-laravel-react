import React from "react";
import "./css/jednojelo.css";
import { useNavigate } from 'react-router-dom';


const JednoJelo = ({jelo}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/recipe/${jelo.id}`); // Navigacija ka stranici za recept
  };

  return (
    <div className="card" style={{ margin: 25, borderStyle: "solid" }}>
      <a>
      <img className="card-img-top" src={jelo.slika} alt={jelo.name} /> 
      </a>
      <div className="card-body">
        <h3 className="card-title">{jelo.name}</h3>
        <div className="card-text">
        <span className="prep-time">Prep time: {jelo.prep_time} min</span>
        <ul className="sastojci">
            {jelo.ingredients.map((sastojak) => (
              <li key={sastojak.id}>{sastojak.name}</li>
            ))}
              
          </ul>
          
        </div>
      </div>
      <button className="buttonRecipe" onClick={handleClick}>Pogledaj recept</button>
    </div>
  );
};

export default JednoJelo;