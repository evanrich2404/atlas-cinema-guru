import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './navigation.css';
import Activity from '../Activity';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faStar, faClock, faArrowRight } from '@fortawesome/free-solid-svg-icons';

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
    const fetchActivities = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('https://localhost:8000/api/activity', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('API response:', response.data);
        setActivities(response.data);
      } catch (error) {
        console.error('Error fetching activities', error);
      }
    };

    fetchActivities();
  }, []);

  useEffect(() => {
    if (!small) {
      setShowActivities(true);
    } else {
      setShowActivities(false);
    }
  }, [small]);

  return (
    <nav
      className={`sidebar ${small ? 'small' : ''}`}
      onMouseEnter={() => setSmall(false)}
      onMouseLeave={() => setSmall(true)}
    >
      <ul className="navigation">
        <li onClick={() => setPage("home")} className={selected === "home" ? "selected" : ""}>
          <FontAwesomeIcon icon={faFolder} />
          {!small && <span>Home</span>}
          {!small && selected === "home" && (
            <FontAwesomeIcon icon={faArrowRight} className="arrow visible" />
          )}
        </li>
        <li onClick={() => setPage("favorites")} className={selected === "favorites" ? "selected" : ""}>
          <FontAwesomeIcon icon={faStar} />
          {!small && <span>Favorites</span>}
          {!small && selected === "favorites" && (
            <FontAwesomeIcon icon={faArrowRight} className="arrow visible" />
          )}
        </li>
        <li onClick={() => setPage("watchlater")} className={selected === "watchlater" ? "selected" : ""}>
          <FontAwesomeIcon icon={faClock} />
          {!small && <span>Watch Later</span>}
          {!small && selected === "watchlater" && (
            <FontAwesomeIcon icon={faArrowRight} className="arrow visible" />
          )}
        </li>
      </ul>
      {showActivities && (
        <>
          <div className='latest-activities'>
            <p>Latest Activities</p>
          </div>
          <ul className="activity-list">
            {activities.slice(0, 10).map((activity, index) => (
              <Activity
                key={index}
                userUsername={activity.userUsername}
                title={activity.title}
                date={activity.date}
              />
            ))}
          </ul>
        </>
      )}
    </nav>
  );
};

export default SideBar;
