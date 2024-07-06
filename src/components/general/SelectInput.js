import React from 'react';
import './general.css';

const SelectInput = ({
  label,
  options,
  className,
  value,
  setValue
}) => {
  const handleSelect = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className={`select-wrapper ${className}`}>
      {label && <label className='select-label'>{label}</label>}
      <select value={value} onChange={handleSelect} className='select-field'>
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
