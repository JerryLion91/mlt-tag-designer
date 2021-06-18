import React from 'react';
import Modal from 'react-responsive-modal';
import PropTypes from 'prop-types';

import styles from '../styles/styles';

import Button from './Button';
import Input from './Input';

export default function MessageModal({ state, dispatch }) {
  const { showModal, method, message, value, callback } = state;
  // method =  alert || prompt || confirm

  const [respValue, setRespValue] = React.useState(value);

  React.useEffect(() => {
    setRespValue(value);
  }, [value]);

  const handleResponse = (bool) =>
    bool
      ? dispatch({ type: 'response', value: respValue, callback })
      : dispatch({ type: 'response' });
  return (
    <Modal
      open={showModal}
      onClose={() => dispatch({ type: 'response' })}
      showCloseIcon={false}
      center
    >
      <div style={{ ...styles.modalFlexColumn, alignItems: 'center' }}>
        <div style={{ justifySelf: 'center', color: '#37474f' }}>{message}</div>
        {method === 'prompt' && (
          <div>
            <Input
              type="text"
              label="prompt"
              value={respValue}
              onChange={(newValue) => setRespValue(newValue)}
            />
          </div>
        )}
        <div style={styles.divFlexRow}>
          <Button
            style={styles.btnFilledPurple}
            onClick={() => handleResponse(true)}
            icon={''}
          >
            Ok
          </Button>
          {method === 'confirm' && (
            <Button
              style={styles.btnFilledPurple}
              onClick={() => handleResponse(false)}
              icon={''}
            >
              Cancel
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}

MessageModal.propTypes = {
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};
