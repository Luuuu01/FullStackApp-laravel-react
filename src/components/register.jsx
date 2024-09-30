import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/register.css";
import { TbPasswordUser } from "react-icons/tb";
import { MdEmail } from "react-icons/md";
import { TbWritingSign } from "react-icons/tb";
import axios from "axios";

const Register = () => {
  
  let navigate=useNavigate();
  const [registerData, setRegisterData]= useState({
    name:"",
    email: "",
    password: "",
  });

  function handleInput(e){
    let newRegisterData=registerData;
    newRegisterData[e.target.name]=e.target.value;
    setRegisterData(newRegisterData);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
    .post("api/register",registerData)
    .then((res) => {
      console.log(res.data);
      navigate("/login");
    })
    .catch((e) =>{
      console.log(e);
    })
  };

  return (
    <div className="register-form-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <label>
          Name:
          <div style={{ position: "relative" }}>
            <input
              type="text"
              name="name"
              onInput={handleInput}
              placeholder="Enter your username"
              style={{ paddingRight: "30px" }} // Dodajte prostor za ikonu
            />
            <TbWritingSign
              style={{
                position: "absolute",
                height: "30px",
                width: "20px",
                right: "10px",
                top: "30%",
                transform: "translateY(-50%)",
              }}
            />
          </div>
        </label>
        <br />
        <label>
          Email:
          <div style={{ position: "relative" }}>
            <input
              type="email"
              name="email"
              onInput={handleInput}
              placeholder="Enter your email"
              style={{ paddingRight: "30px" }} // Dodajte prostor za ikonu
            />
            <MdEmail
              style={{
                position: "absolute",
                height: "30px",
                width: "20px",
                right: "10px",
                top: "30%",
                transform: "translateY(-50%)",
              }}
            />
          </div>
        </label>
        <br />
        <label>
          Password:
          <div style={{ position: "relative" }}>
            <input
              type="password"
              name="password"
              onInput={handleInput}
              placeholder="Enter your password"
              style={{ paddingRight: "30px" }} // Dodajte prostor za ikonu
            />
            <TbPasswordUser
              style={{
                position: "absolute",
                height: "30px",
                width: "20px",
                right: "10px",
                top: "30%",
                transform: "translateY(-50%)",
              }}
            />
          </div>
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
