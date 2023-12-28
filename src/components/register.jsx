import React, { useState } from "react";
import "./register.css";
import { TbPasswordUser } from "react-icons/tb";
import { MdEmail } from "react-icons/md";
import { TbWritingSign } from "react-icons/tb";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement registration logic
  };

  return (
    <div className="register-form-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        {/* <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Enter your username"
          />
        </label> */}
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
        <br />
        <label>
          Email:
          <div style={{ position: "relative" }}>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
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
        {/* <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter your password"
            style={{ paddingRight: "30px" }}
          />
        </label> */}
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
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
