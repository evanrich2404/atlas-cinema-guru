import React, { useState } from 'react';
import './auth.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEye, faEyeSlash, faKey } from '@fortawesome/free-solid-svg-icons';

const Register = ({ username, password, setUsername, setPassword }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='auth-form'>
      <label>Create a new account</label>
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
          <FontAwesomeIcon icon={faKey} className='icon' /> Sign Up
          </button>
      </div>
    </div>
  );
};

export default Register;
