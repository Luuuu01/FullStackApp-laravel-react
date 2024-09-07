import React from "react";
import "./jednojelo.css";


const JednoJelo = ({jelo}) => {
  

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
    </div>
  );
};

export default JednoJelo;