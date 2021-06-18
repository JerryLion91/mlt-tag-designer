import React from 'react';
import PropTypes from 'prop-types';

export default function Button({ onClick, icon, classNames, style, children }) {
  const text = children || '';
  return (
    <a
      className={` ${classNames}`}
      style={{ ...styles.button, ...style }}
      onClick={onClick}
    >
      {icon && (
        <i style={styles.icon} className="material-icons">
          {icon}
        </i>
      )}

      {text}
    </a>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.string,
  classNames: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.string,
};

const styles = {
  icon: {
    fontSize: '1.5em',
    margin: '3px',
    color: 'grey',
  },
  button: {
    margin: '3px',
    padding: '3px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    cursor: 'pointer',
    fontSize: 'calc(9px + 1vh)',
  },
};
