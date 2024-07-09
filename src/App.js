import React, { useState, useEffect } from 'react';
import './App.css';
import Authentication from './routes/auth/Authentication.js';
import Dashboard from './routes/dashboard/Dashboard.js';
import axios from 'axios';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userUsername, setUserUsername] = useState("");

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      axios.post('./api/auth/', {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then(response => {
        setIsLoggedIn(true);
        setUserUsername(response.data.username);
      })
      .catch(error => {
        console.error('Authentication failed', error);
      });
    }
  }, []);

  return (
    <div className='App'>
      {isLoggedIn ? (
        <Dashboard userUsername={userUsername} setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <Authentication setIsLoggedIn={setIsLoggedIn} setUserUsername={setUserUsername} />
        )}
    </div>
  );
};

export default App;
