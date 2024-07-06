import React from 'react';
import "./general.css";

const Input = ({
  label,
  type,
  className,
  value,
  setValue,
  icon,
  inputAttributes
}) => {
  const handleInput = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className={`input-wrapper ${className}`}>
      {label && <label className='input-label'>{label}</label>}
      <div className='input-field-wrapper'>
        {icon && <span className='input-icon'>{icon}</span>} {/* FontAwesomeIcon for icon */}
        <input
          type={type}
          value={value}
          onChange={handleInput}
          className='input-field'
          {...inputAttributes} // Spread other input attributes
        />
      </div>
    </div>
  );
};

export default Input;
