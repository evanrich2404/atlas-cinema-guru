import React from "react";
import './navigation.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const Header = ({ userUsername, setIsLoggedIn }) => {
  const logout = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
  };

  return (
    <nav className="nav-container">
      <div className="left">
        <h1>Cinema Guru</h1>
      </div>
      <div className="right">
        <img src="https://picsum.photos/100/100" alt="User Avatar" className="avatar" />
        <p>Welcome, {userUsername}!</p>
        <span className="logout" onClick={logout}>
          <FontAwesomeIcon icon={faSignOutAlt} className="logout-icon" />
          Logout
        </span>
      </div>
    </nav>
  );
};

export default Header;
