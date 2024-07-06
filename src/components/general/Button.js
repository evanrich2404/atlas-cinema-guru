import React from 'react';
import './general.css';

const Button = ({
  label,
  className,
  onClick,
  icon
}) => {
  return (
    <button className={`button ${className}`} onClick={onClick}>
      {icon && <span className='button-icon'>{icon}</span>} {/* FontAwesomeIcon for icon */}
      {label}
    </button>
  );
};

export default Button;
