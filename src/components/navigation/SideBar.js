import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './navigation.css';
import Activity from '../Activity';

const SideBar = () => {
  const [selected, setSelected] = useState("home");
  const [small, setSmall] = useState(true); // State for sidebar size
  const [activities, setActivities] = useState([]);
  const [showActivities, setShowActivities] = useState(false); // State for showing activities

  const navigate = useNavigate();

  const setPage = (pageName) => {
    setSelected(pageName);
    switch (pageName) {
      case "home":
        navigate('/home');
        break;
      case "favorites":
        navigate('/favorites');
        break;
      case "watchlater":
        navigate('/watchlater');
        break;
      default:
        navigate('/home');
    }
  };

  useEffect(() => {
    axios.get('/api/activity')
      .then(response => {
        setActivities(response.data);
      })
      .catch(error => {
        console.error('Error fetching activities:', error);
        });
  }, []);

  return (
    <nav className={`sidebar ${small ? 'small' : ''}`}>
      <button onClick={() => setSmall(!small)}>Toggle Size</button> {/* Toggle button */}
      <ul className="navigation">
        <li onClick={() => setPage("home")} className={selected === "home" ? "selected" : ""}>
          <i className="icon-home"></i> Home
        </li>
        <li onClick={() => setPage("favorites")} className={selected === "favorites" ? "selected" : ""}>
          <i className="icon-favorites"></i> Favorites
        </li>
        <li onClick={() => setPage("watchlater")} className={selected === "watchlater" ? "selected" : ""}>
          <i className="icon-watchlater"></i> Watch Later
        </li>
      </ul>
      <button onClick={() => setShowActivities(!showActivities)}>Toggle Activities</button> {/* Toggle button */}
      {showActivities && ( // Conditional rendering based on showActivities state
        <ul className="activity-list">
          {activities.slice(0, 10).map((activity, index) => (
            <Activity key={index} activity={activity} />
          ))}
        </ul>
      )}
    </nav>
  );
};

export default SideBar;
