import React from "react";

const JednoJelo = ({jelo}) => {
  

  return (
    <div className="card" style={{ margin: 25, borderStyle: "solid" }}>
      <a>
        <img className="card-img-top"  alt="Neka slika" />
      </a>
      <div className="card-body">
        <h3 className="card-title">{jelo.name}</h3>
        <div className="card-text">
        <ul>
            {jelo.ingredients.map((sastojak) => (
              <li key={sastojak.id}>{sastojak.name}</li>
            ))}
          </ul>
          Prep time: {jelo.prep_time}min
        </div>
      </div>
    </div>
  );
};

export default JednoJelo;