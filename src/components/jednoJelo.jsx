import React from "react";

const JednoJelo = ({ jelo}) => {
  const sastojci = jelo.sastojci;

  return (
    <div className="card" style={{ margin: 25, borderStyle: "solid" }}>
      <a>
        <img className="card-img-top" src={jelo.slika} alt="Neka slika" />
      </a>
      <div className="card-body">
        <h3 className="card-title">{jelo.ime}</h3>
        <div className="card-text">
          {sastojci.map((sastojak, index) => (
            <span key={index}>
              {sastojak}
              {index < sastojci.length - 1 ? ', ' : ''}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JednoJelo;