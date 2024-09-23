import React, { useState } from "react";
import "./css/login.css";
import { Link, useNavigate } from "react-router-dom";
import { TbPasswordUser, TbWritingSign } from "react-icons/tb";
import axios from "axios";

const Login = ({ addToken, setIsAdmin }) => {
  let navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleInput(e) {
    const { name, value } = e.target;
    setLoginData(prevData => ({ ...prevData, [name]: value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setStatus(null);
  
    try {
      const response = await axios.post("api/login", loginData);
      if (response.data.success) {
        const { token, is_admin } = response.data; // Get is_admin from response
        window.sessionStorage.setItem("auth_token", token);
        addToken(token);
        setIsAdmin(is_admin); // Set admin status
        navigate(is_admin ? "/admin-dashboard" : "/recipes"); // Navigate based on admin status
        setMessage('Login successful!');
        setStatus('success');
      } else {
        setMessage(response.data.message || 'Login failed.');
        setStatus('error');
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred.');
      setStatus('error');
    } finally {
      setLoading(false);
    }
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
              onChange={handleInput}
              name="email"
              placeholder="Enter your email"
              style={{ paddingRight: "30px" }}
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
              onChange={handleInput}
              name="password"
              placeholder="Enter your password"
              style={{ paddingRight: "30px" }}
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
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
        <p>
          Forgot password? <Link to="/forgot-password">Click here</Link>
        </p>
        {message && <p className={`message ${status}`}>{message}</p>}
      </form>
    </div>
  );
};

export default Login;
