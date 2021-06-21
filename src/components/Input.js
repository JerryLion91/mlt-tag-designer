import React from 'react';

import PropTypes from 'prop-types';

import '../styles/input.css';

export default function Input({
  type,
  label,
  helper,
  value,
  onChange,
  onClick,
  onFocus,
  onBlur,
  width,
  readOnly = false,
}) {
  const handleChange = ({ target }) => {
    onChange(target.value);
  };
  const handleFocus = () => {
    if (onFocus) onFocus();
  };
  const handleBlur = () => {
    if (onBlur) onBlur();
  };
  const handleClick = () => {
    if (onClick) onClick();
  };

  return (
    <div className="input-container" style={{ width: width }}>
      <input
        className={`${value !== '' ? 'hasValue' : null} ${
          type === 'password' && value.length < 6 && value !== ''
            ? 'invalidPassword'
            : null
        }`}
        type={type}
        value={value}
        onClick={handleClick}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        required
        readOnly={readOnly}
      />
      <label>{label}</label>
      <span className="helper">{helper}</span>
    </div>
  );
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string,
  helper: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  readOnly: PropTypes.bool,
};
