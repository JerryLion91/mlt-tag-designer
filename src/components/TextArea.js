import React from 'react';

import PropTypes from 'prop-types';

import '../styles/textarea.css';

export default function TextArea({
  label,
  helper,
  value,
  onChange,
  onClick,
  onFocus,
  onBlur,
  width,
  readOnly = false,
  maxCaracters,
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
      <textarea
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
      {maxCaracters && (
        <span className="counter">{`${value.length}/${maxCaracters}`}</span>
      )}
    </div>
  );
}

TextArea.propTypes = {
  label: PropTypes.string,
  helper: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  readOnly: PropTypes.bool,
  maxCaracters: PropTypes.number,
};
