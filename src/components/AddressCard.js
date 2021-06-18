import React from 'react';
import Input from '../../../mlt-tag-designer/src/components/Input';
import Button from './Button';

import styles from '../../../mlt-tag-designer/src/styles/styles';

import PropTypes from 'prop-types';

export default function AddressCard({
  address,
  index,
  handleDeleteClick,
  handleSaveClick,
  handleChange,
  setDefault,
}) {
  if (!address) return null;
  const handleFirstNameChange = (newValue) => {
    // Validation
    handleChange({ ...address, firstName: newValue, saved: false }, index);
  };

  const handleLastNameChange = (newValue) => {
    // Validation
    handleChange({ ...address, lastName: newValue, saved: false }, index);
  };

  const handleStreetChange = (newValue) => {
    // Validation
    handleChange({ ...address, street: newValue, saved: false }, index);
  };

  const handleCountryChange = (newValue) => {
    // Validation
    handleChange({ ...address, country: newValue, saved: false }, index);
  };

  const handleCityChange = (newValue) => {
    // Validation
    handleChange({ ...address, city: newValue, saved: false }, index);
  };

  const handlePostalCodeChange = (newValue) => {
    // Validation
    handleChange({ ...address, postalCode: newValue, saved: false }, index);
  };

  return (
    <div>
      <div style={styles.divFlexRow}>
        {index === undefined ? (
          <span style={{ alignSelf: 'center', margin: '10px' }}>
            Address Details
          </span>
        ) : index === 0 ? (
          <span style={{ alignSelf: 'center', margin: '10px' }}>
            Default Address
          </span>
        ) : (
          <div style={styles.divFlexRow}>
            <span style={{ alignSelf: 'center', margin: '10px' }}>
              Address {index + 1}
            </span>
            {setDefault !== undefined ? (
              <Button
                onClick={() => setDefault(index)}
                icon={''}
                style={{
                  ...styles.btnUnfilledGray,
                  border: '1px solid #7a7a7a',
                  borderRadius: '5px',
                  padding: '0px 5px',
                  fontSize: 'calc(7px + 0.8vmin)',
                }}
              >
                Set Default
              </Button>
            ) : (
              ''
            )}
          </div>
        )}
        {address.saved ? (
          <>
            {handleDeleteClick !== undefined ? (
              <Button
                onClick={() => handleDeleteClick(index)}
                icon={'delete_forever'}
              />
            ) : (
              ''
            )}
          </>
        ) : (
          <>
            {handleSaveClick !== undefined ? (
              <Button onClick={() => handleSaveClick(index)} icon={'save'} />
            ) : (
              ''
            )}
          </>
        )}
      </div>
      <div style={styles.card}>
        <Input
          type="text"
          label="First Name:"
          value={address.firstName}
          onChange={handleFirstNameChange}
        />
        <Input
          type="text"
          label="Last Name:"
          value={address.lastName}
          onChange={handleLastNameChange}
        />
        <Input
          type="text"
          label="Street:"
          value={address.street}
          onChange={handleStreetChange}
        />
        <Input
          type="text"
          label="City:"
          value={address.city}
          onChange={handleCityChange}
        />
        <Input
          type="text"
          label="Country:"
          value={address.country}
          onChange={handleCountryChange}
        />
        <Input
          type="text"
          label="Postal Code:"
          value={address.postalCode}
          onChange={handlePostalCodeChange}
        />
      </div>
    </div>
  );
}

AddressCard.propTypes = {
  address: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    street: PropTypes.string,
    country: PropTypes.string,
    city: PropTypes.string,
    postalCode: PropTypes.string,
    saved: PropTypes.bool,
  }),
  handleChange: PropTypes.func.isRequired,
  index: PropTypes.number,
  handleDeleteClick: PropTypes.func,
  handleSaveClick: PropTypes.func,
  setDefault: PropTypes.func,
};
