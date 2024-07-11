import React from 'react';
import './components.css';

function Activity({ userUsername, title, date }) {
  console.log('Activity component props:', { userUsername, title, date }); // Log the props
  return (
    <li className="activity">
      <p>
        <span className="activity-red">{userUsername} </span>
        added
        <span className="activity-red"> {title} </span>
        to watch later -
        <span className="activity-italics"> {date}</span>
      </p>
    </li>
  );
};

export default Activity;
