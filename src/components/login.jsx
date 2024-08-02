import React, { useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import { TbPasswordUser } from "react-icons/tb";
import { TbWritingSign } from "react-icons/tb";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({addToken}) => {

  let navigate=useNavigate();
  const [loginData, setloginData]= useState({
    email: "",
    password: "",
  });

  function handleInput(e){
    let newloginData=loginData;
    newloginData[e.target.name]=e.target.value;
    setloginData(newloginData);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
    .post("api/login",loginData)
    .then((res) => {
      console.log(res.data);
      if(res.data.success===true){
        window.sessionStorage.setItem("auth_token",res.data.token)
        addToken(res.data.token);
        navigate("/svajela")
      }
    })
    .catch((e) =>{
      console.log(e);
    })
  };

  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <label>
          Email:
          <div style={{ position: "relative" }}>
            <input
              type="text"
              onInput={handleInput}
              name="email"
              placeholder="Enter your email"
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
        <label>
          Password:
          <div style={{ position: "relative" }}>
            <input
              type="password"
              onInput={handleInput}
              name="password"
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
        <button type="submit">Login</button>
        <p>
          Nemaš nalog? <Link to="/register">Registruj se</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
