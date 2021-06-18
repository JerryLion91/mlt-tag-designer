import React from 'react';
import PropTypes from 'prop-types';

export default function AppBody({ children }) {
  return <div style={styles.appBody}>{children}</div>;
}

const styles = {
  appBody: {
    flex: '1 0 auto',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    fontSize: 'calc(9px + 1vmin)',
    color: 'rgb(241, 226, 13)',
  },
};

AppBody.propTypes = {
  children: PropTypes.node.isRequired,
};
