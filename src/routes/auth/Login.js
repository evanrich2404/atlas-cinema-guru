import React, { useState } from 'react';
import './auth.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = ({ username, password, setUsername, setPassword }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='auth-form'>
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
    </div>
  );
};

export default Login;
