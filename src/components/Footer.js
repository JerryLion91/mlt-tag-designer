import React from 'react';

import { useHistory } from 'react-router-dom';
import Button from './Button';

import PropTypes from 'prop-types';

export default function Footer({ children, defaultButtons }) {
  const history = useHistory();
  return (
    <footer style={styles.footer}>
      <div style={styles.divFlexColumn}>
        {defaultButtons ? (
          <>
            <Button onClick={() => history.push('/')}>Home</Button>
            <Button onClick={() => history.push('/tag-constructor')}>
              Tag Designer
            </Button>
            <Button onClick={() => history.push('/contact-form')}>
              Contact Us
            </Button>
          </>
        ) : null}
        {children}
      </div>
      <div style={styles.divFlexRow}>
        <img
          src={'logo.svg'}
          alt={''}
          style={{ height: '25px', marginRight: '5px' }}
        />
        <span style={{ fontWeight: '500' }}>M.L.T. Designs</span>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    paddingTop: '10px',
    flexShrink: 0,
    textAlign: 'center',
    backgroundColor: '#e5e8ea',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    fontFamily: "'Quicksand', sans-serif",
  },
  divFlexColumn: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    display: 'flex',
    flexFlow: 'column wrap',
  },
  divFlexRow: {
    margin: '10px 0px 0px 0px',
    padding: '15px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  h1heading: {
    margin: '0.4em',
    fontWeight: '500',
    fontSize: 'calc(25px + 2vmin)',
  },
  h3heading: {
    margin: '0.4em',
    fontWeight: '450',
    fontSize: 'calc(13px + 1.8vmin)',
  },
};

Footer.propTypes = {
  children: PropTypes.node,
};
