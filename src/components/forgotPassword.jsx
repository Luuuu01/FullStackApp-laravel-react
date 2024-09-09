import { useState } from 'react';
import axios from 'axios';
import './css/forgotPassword.css'; // Importuj CSS datoteku

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setStatus(null);

    try {
      const response = await axios.post("/api/forgot-password", { email });
      setMessage(response.data.message);
      setStatus('success');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error sending reset link.');
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit} className="forgot-password-form">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="input-email"
        />
        <button type="submit" disabled={loading} className="submit-button">
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>
      {message && <p className={`message ${status}`}>{message}</p>}
    </div>
  );
}

export default ForgotPassword;
