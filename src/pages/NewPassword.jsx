import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import '../styling/VCode.css';

function NewPassword(){
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const location = useLocation();
  const { verificationCode } = location.state || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/reset-password', {
        verificationCode,
        newPassword,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Password reset failed. Please try again.');
    }
  };

  return (
    <div className='VCode-container'>
      <h2>Set New Password</h2>
      <form className='form-group' onSubmit={handleSubmit}>
        <div>
          <label>New Password:</label>
          <input
            className='form-control'
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit"><a href='./HomePageAfter'>Done</a></button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default NewPassword;
