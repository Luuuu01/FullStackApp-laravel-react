import React, { useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import { TbPasswordUser } from "react-icons/tb";
import { TbWritingSign } from "react-icons/tb";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement login logic
  };

  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <label>
          Username:
          <div style={{ position: "relative" }}>
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
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
        <label>
          Password:
          <div style={{ position: "relative" }}>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
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
          Nemaš account? <Link to="/register">Registruj se</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
