import React, { useState } from "react";
import './auth.css';
import Login from './Login';
import Register from './Register';

const Authentication = ({ setIsLoggedIn, setUserUsername }) => {
  const [_switch, setSwitch] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="auth-container">
      <div className="auth-buttons">
        <button className={`sign-in-button ${_switch ? 'active' : ''}`} onClick={() => setSwitch(true)}>Sign In</button>
        <button className={`sign-up-button ${!_switch ? 'active' : ''}`} onClick={() => setSwitch(false)}>Sign Up</button>
      </div>
      {_switch ? (
        <Login
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          setIsLoggedIn={setIsLoggedIn}
          setUserUsername={setUserUsername}
        />
      ) : (
        <Register
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          setIsLoggedIn={setIsLoggedIn}
          setUserUsername={setUserUsername}
        />
      )}
    </div>
  );
};

export default Authentication;
