// Libs
import React from 'react';

// Helpers
import { useHistory, useLocation } from 'react-router-dom';

// Components
import Button from './Button';

// Misc
import PropTypes from 'prop-types';

export default function Footer({ children, defaultButtons }) {
  const history = useHistory();
  const location = useLocation();

  const goTo = (pathname) => {
    if (location.pathname === pathname) {
      window.scrollTo(0, 0);
    } else {
      history.push(pathname);
    }
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.divFlexColumn}>
        {defaultButtons ? (
          <>
            <Button onClick={() => goTo('/')}>Home</Button>
            <Button onClick={() => goTo('/tag-constructor')}>
              Tag Designer
            </Button>
            <Button onClick={() => goTo('/contact-form')}>Contact Us</Button>
          </>
        ) : null}
        {children}
      </div>
      <div style={styles.divFlexRow}>
        <img
          src={'../logo.svg'}
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
