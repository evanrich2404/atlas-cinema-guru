import React, { useState } from 'react';
import './auth.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = ({ username, password, setUsername, setPassword, setIsLoggedIn, setUserUsername }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', { username, password });
      const { accessToken, message } = response.data;
      localStorage.setItem('accessToken', accessToken);
      setUserUsername(username);
      setIsLoggedIn(true);
      console.log(message);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <form onSubmit={handleLogin} className='auth-form'>
      <label>Sign in with your account</label>
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
        <button type='submit'>Sign In</button>
      </div>
    </form>
  );
};

export default Login;
