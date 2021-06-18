import React from 'react';
import AppBody from '../components/AppBody';
import Button from '../components/Button';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SettingsButton from '../components/SettingsButton';
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../helpers/use-auth';
import AddressCard from '../components/AddressCard';

import styles from '../styles/styles';
import Input from '../components//Input';
import LoadingPage from './LoadingPage';

// DataBank
// import * as api from '../../service/apiService';

export default function AddressesPage() {
  const location = useLocation();
  const history = useHistory();
  const { from } = location.state || { from: '/' };

  const [loading, setLoading] = React.useState(true);

  // get user addresses
  const { user } = useAuth();

  const [userAddresses, setUserAddresses] = React.useState(null);

  // const getAddresses = async () => {
  //   try {
  //     const { data } = await api.getUserAddressesByUid(user.uid);
  //     const addressesWithoutDetails = data.addresses.map((address) => {
  //       return {
  //         ...address,
  //         detailed: false,
  //       };
  //     });
  //     setUserAddresses(addressesWithoutDetails);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error('Cannot retrive addresses data' + error);
  //   }
  // };
  // React.useEffect(() => {
  //   if (user) {
  //     if (!userAddresses) {
  //       getAddresses();
  //     }
  //   }
  // }, [userAddresses, user]);
  // End get user addresses

  const addNewAddress = () => {
    setUserAddresses((prevState) => {
      const blankAddress = {
        firstName: '',
        lastName: '',
        street: '',
        country: '',
        city: '',
        postalCode: '',
        saved: false,
        detailed: true,
      };
      return [...prevState, blankAddress];
    });
  };

  const handleDelete = (index) => {
    const newAddressArray = userAddresses.filter((_, i) => {
      return i !== index;
    });

    // firestore
    //   .updateUserAdresses(uid, newAddressArray)
    //   .then((data) => {
    //     // UserAddress updated.
    //     setUserAddresses(data);
    //   })
    //   .catch((error) => {
    //     // An error happened.
    //     console.log(error.code);
    //     console.log(error.message);
    //   });
  };

  const setDefault = (index) => {
    const newAddressArray = Array.from(userAddresses);
    const newDefaultAddress = newAddressArray.splice(index, 1);
    newAddressArray.unshift(newDefaultAddress[0]);

    // firestore
    //   .updateUserAdresses(uid, newAddressArray)
    //   .then((data) => {
    //     // UserAddress updated.
    //     setUserAddresses(data);
    //   })
    //   .catch((error) => {
    //     // An error happened.
    //     console.log(error.code);
    //     console.log(error.message);
    //   });
  };

  const handleSave = (index) => {
    const propertyArray = [];
    for (const property in userAddresses[index]) {
      if (userAddresses[index][property] === '') {
        propertyArray.push(property);
      }
    }
    if (propertyArray.length > 0) {
      alert(
        `You must fill all fields to save.\n
${propertyArray.join(', ')} must be filled`
      );
      return;
    }

    const newAddressArray = Array.from(userAddresses);
    newAddressArray[index].saved = true;

    // firestore
    //   .updateUserAdresses(uid, newAddressArray)
    //   .then((data) => {
    //     // UserAddress updated.
    //     setUserAddresses(data);
    //   })
    //   .catch((error) => {
    //     // An error happened.
    //     console.log(error.code);
    //     console.log(error.message);
    //   });
  };

  const handleChange = (newAddress, index) => {
    setUserAddresses((prevState) => {
      const newAddressArray = Array.from(prevState);

      newAddressArray[index] = newAddress;

      return newAddressArray;
    });
  };

  const handleShowDetails = (index) => {
    setUserAddresses((prevState) => {
      const newAddressArray = Array.from(prevState);
      newAddressArray[index].detailed = true;
      return newAddressArray;
    });
  };
  const handleHideDetails = (index) => {
    if (!userAddresses[index].saved) {
      alert('You cannot hide unsaved changes');
    } else {
      setUserAddresses((prevState) => {
        const newAddressArray = Array.from(prevState);
        newAddressArray[index].detailed = false;
        return newAddressArray;
      });
    }
  };

  const goBack = () => {
    if (
      userAddresses.some(({ saved }) => {
        return saved === false;
      })
    ) {
      alert('You cannot leave with unsaved changes');
    } else {
      history.push(from);
    }
  };

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <>
          <Header subtitle="My Addresses">
            <SettingsButton />
            <Button onClick={goBack} icon={'navigate_before'} />
          </Header>
          <AppBody>
            {userAddresses.map((address, index) => {
              return (
                <div key={`A${index}`}>
                  {address.detailed ? (
                    <div style={styles.cardParent}>
                      <AddressCard
                        key={`B${index}`}
                        address={address}
                        index={index}
                        handleDeleteClick={handleDelete}
                        handleSaveClick={handleSave}
                        handleChange={handleChange}
                        setDefault={setDefault}
                      />
                      <div style={styles.divFlexRow}>
                        <Button
                          onClick={() => handleHideDetails(index)}
                          icon={'info'}
                          style={{
                            ...styles.btnUnfilledGray,
                            fontSize: 'calc(6px + 0.8vmin)',
                            margin: '10px 0px',
                          }}
                        >
                          Hide details
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div style={styles.cardParent}>
                      <div>
                        <div style={{ ...styles.divFlexRow, width: '100%' }}>
                          {index === undefined ? (
                            <span
                              style={{ alignSelf: 'center', margin: '10px' }}
                            >
                              Address Details
                            </span>
                          ) : index === 0 ? (
                            <span
                              style={{ alignSelf: 'center', margin: '10px' }}
                            >
                              Default Address
                            </span>
                          ) : (
                            <div style={styles.divFlexRow}>
                              <span
                                style={{ alignSelf: 'center', margin: '10px' }}
                              >
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
                                    margin: '7px',
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
                          {index !== 0 && (
                            <Button
                              onClick={() => handleDelete(index)}
                              icon={'delete_forever'}
                            />
                          )}
                        </div>
                        <div style={styles.card}>
                          <Input
                            type="text"
                            label="Street:"
                            value={address.street}
                            onChange={() => {
                              console.log('street');
                            }}
                          />
                        </div>
                      </div>
                      <div style={styles.divFlexRow}>
                        <Button
                          onClick={() => handleShowDetails(index)}
                          icon={'info'}
                          style={{
                            ...styles.btnUnfilledGray,
                            fontSize: 'calc(6px + 0.8vmin)',
                            margin: '10px 0px',
                          }}
                        >
                          Show details
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            <div style={styles.divFlexRow}>
              <Button
                onClick={addNewAddress}
                icon={'add_location'}
                style={{ ...styles.btnUnfilledColor, margin: '10px 0px' }}
              >
                Add New Address
              </Button>
            </div>
          </AppBody>
          <Footer defaultButtons />
        </>
      )}
    </>
  );
}
