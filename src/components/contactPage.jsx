import React, { useState } from 'react';
import './contactPage.css';
import { useForm } from '@formspree/react';

const ContactPage = () => {
    
  const [state, handleSubmit] = useForm("mpzvayow");
  
  
  const [PodaciForme, setPodaciForme] = useState({
    naziv: '',
    sastojci: '',
    poruka: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPodaciForme((prevData) => ({ ...prevData, [name]: value }));
  };

  


  return (
    <div className="contact-page">
      <h2>Kontaktirajte Nas</h2>
      <form
        action="https://formspree.io/f/mpzvayow"
        method="POST"
        onSubmit={handleSubmit}
      >
        <label>
          Naziv Jela:
          <input
            type="text"
            name="naziv"
            value={PodaciForme.naziv}
            onChange={handleChange}
            required
          />
        </label>
        
        <label>
          Sastojci:
          <textarea
            name="sastojci"
            value={PodaciForme.sastojci}
            onChange={handleChange}
            required
          ></textarea>
        </label>
        
        <label>
          Poruka:
          <textarea
            name="poruka"
            value={PodaciForme.poruka}
            onChange={handleChange}
            required
          ></textarea>
        </label>
        
        <button type="submit" >Pošalji</button>
      </form>
    </div>
  );
};

export default ContactPage;