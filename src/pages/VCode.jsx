import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styling/VCode.css';

function VCode(){
  const [verificationCode, setVerificationCode] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/verify-code', { verificationCode });
      if (response.data.success) {
        navigate('/reset-password', { state: { verificationCode } });
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage('Verification failed. Please try again.');
    }
  };

  return (
    <div className='VCode-container '>
      <h2>Enter Verification Code</h2>
      <form className='form-group ' onSubmit={handleSubmit}>
        <div>
          <label>Verification Code:</label>
          <input
            className='form-control'
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default VCode;
