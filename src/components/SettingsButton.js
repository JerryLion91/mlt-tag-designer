// Libs
import React from 'react';

// Modal package
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

import { useHistory, useLocation } from 'react-router-dom';

import { useAuth } from '../helpers/use-auth';

import styles from '../styles/styles';

import Button from './Button';

export default function SettingsButton() {
  const auth = useAuth();
  const user = auth.user;
  let location = useLocation();
  let history = useHistory();
  const [showModal, setShowModal] = React.useState(false);

  const onSignOut = () => {
    auth.signOut(() => {
      history.push('/');
      setShowModal(false);
    });
  };

  const handleUserButton = () => {
    const userLocation = {
      pathname: '/user/profile',
      state: { from: location.pathname },
    };
    history.push(userLocation);
    setShowModal(false);
  };

  const handleAdressesButton = () => {
    const userLocation = {
      pathname: '/user/addresses',
      state: { from: location.pathname },
    };
    history.push(userLocation);
    setShowModal(false);
  };

  const handleOrdersButton = () => {
    const userLocation = {
      pathname: '/user/orders',
      state: { from: location.pathname },
    };
    history.push(userLocation);
    setShowModal(false);
  };

  return (
    <>
      <Button onClick={() => setShowModal(true)} icon={'settings'} />
      <Modal
        styles={{
          modal: {
            position: 'absolute',
            right: '30%',
            top: '0px',
          },
        }}
        open={showModal}
        onClose={() => setShowModal(false)}
        showCloseIcon={false}
      >
        {user ? (
          <div style={styles.modalFlexColumn}>
            {user.displayName && (
              <p style={{ color: '#37474f' }}>
                Hello <br />
                {user.displayName}!
              </p>
            )}
            <Button onClick={handleUserButton} icon={'account_box'}>
              Profile
            </Button>
            <Button onClick={handleAdressesButton} icon={'location_on'}>
              Addresses
            </Button>
            <Button onClick={handleOrdersButton} icon={'local_mall'}>
              Orders
            </Button>
            <Button onClick={onSignOut} icon={'chevron_left'}>
              Logout
            </Button>
          </div>
        ) : (
          <div style={styles.modalFlexColumn}>
            <Button
              onClick={() => history.push('/login')}
              icon={'account_circle'}
            >
              Login
            </Button>
            <Button
              onClick={() => history.push('/login/register')}
              icon={'person_add'}
            >
              Register
            </Button>
          </div>
        )}
      </Modal>
    </>
  );
}
