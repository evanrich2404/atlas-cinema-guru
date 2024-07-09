import React, { useState } from "react";
import './auth.css';
import Login from './Login';
import Register from './Register';
import axios from "axios";

const Authentication = ({ setIsLoggedIn, setUserUsername }) => {
  const [_switch, setSwitch] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = _switch ? '/api/auth/login' : '/api/auth/register';

    try {
      const response = await axios.post(url, {
        username,
        password
      });
      const { accessToken } = response.data;

      localStorage.setItem('accessToken', accessToken);
      setUserUsername(username);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-buttons">
        <button className={`sign-in-button ${_switch ? 'active' : ''}`} onClick={() => setSwitch(true)}>Sign In</button>
        <button className={`sign-up-button ${!_switch ? 'active' : ''}`} onClick={() => setSwitch(false)}>Sign Up</button>
      </div>
      <form onSubmit={handleSubmit}>
        {_switch ? (
          <Login
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
          />
        ) : (
          <Register
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
          />
        )}
      </form>
    </div>
  );
};

export default Authentication;
