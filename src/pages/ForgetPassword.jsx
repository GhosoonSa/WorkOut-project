import React, { useState } from 'react';
import axios from 'axios';
import '../styling/VCode.css';

function ForgetPassword(){
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/request-verification', { email });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Failed to send verification code. Please try again.');
    }
  };

  return (
    <div className='VCode-container'>
      <h2>Request Verification Code</h2>
      <form className='from-group' onSubmit={handleSubmit}>
        <div>
          <label>Enter you email:</label>
          <input
            className='form-control'
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit"><a href='./VCode'>Next</a></button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ForgetPassword;
