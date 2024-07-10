import React, { useState } from 'react';
import './auth.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = ({ username, password, setUsername, setPassword }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='auth-form'>
      <label>Sign in with your account</label>
      <div className='input-wrapper'>
        <div className='input-header'>
          <FontAwesomeIcon icon={faUser} className='icon' />
          <p>Username:</p>
        </div>
        <div className='input-group'>
          <input
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      </div>
      <div className='input-wrapper'>
        <div className='input-header'>
          <FontAwesomeIcon icon={faKey} className='icon' />
          <p>Password:</p>
        </div>
        <div className='input-group show-password'>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            className='toggle'
            onMouseDown={() => setShowPassword(true)}
            onMouseUp={() => setShowPassword(false)}
            onMouseLeave={() => setShowPassword(false)}
          />
        </div>
      </div>
      <div className='submit-button'>
        <button type='submit'>
          <FontAwesomeIcon icon={faKey} className='icon' /> Sign In
          </button>
      </div>
    </div>
  );
};

export default Login;
