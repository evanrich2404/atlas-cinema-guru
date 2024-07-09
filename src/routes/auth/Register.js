import React, { useState } from 'react';
import './auth.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Register = ({ username, password, setUsername, setPassword, setIsLoggedIn, setUserUsername }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/register', { username, password });
      const { accessToken, message } = response.data;
      localStorage.setItem('accessToken', accessToken);
      setUserUsername(username);
      setIsLoggedIn(true);
      console.log(message);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <form onSubmit={handleRegister} className='auth-form'>
      <label>Create a new account</label>
      <div className='input-group'>
        <FontAwesomeIcon icon={faUser} className='icon' />
        <input
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Username'
        />
      </div>
      <div className='input-group show-password'>
        <FontAwesomeIcon icon={faLock} className='icon' />
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
        />
        <FontAwesomeIcon
          icon={showPassword ? faEyeSlash : faEye}
          className='toggle'
          onMouseDown={() => setShowPassword(true)}
          onMouseUp={() => setShowPassword(false)}
          onMouseLeave={() => setShowPassword(false)}
        />
      </div>
      <div className='submit-button'>
        <button type='submit'>Sign Up</button>
      </div>
    </form>
  );
};

export default Register;
