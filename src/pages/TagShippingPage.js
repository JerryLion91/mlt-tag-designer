import React from 'react';
import AppBody from '../components/AppBody';
import Button from '../components/Button';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../helpers/use-auth';

// Styles
import styles from '../styles/styles';

import AddressCard from '../components/AddressCard';
import SummaryTable from '../components/SummaryTable';
import Modal from 'react-responsive-modal';

// DataBank
// import * as api from '../../service/apiService';

export default function TagShippingPage({ order, standards, changeOrder }) {
  const { tag_std_price, shipping_price } = standards;

  // get user addresses
  const auth = useAuth();
  const user = auth.user;
  const [addresses, setAddresses] = React.useState([]);

  // const getAddresses = async () => {
  //   try {
  //     const { data } = await api.getUserAddressesByUid(user.uid);
  //     setAddresses(data.addresses);
  //   } catch (error) {
  //     console.error('Cannot retrive addresses data' + error);
  //   }
  // };
  // React.useEffect(() => {
  //   if (user) {
  //     if (addresses.length === 0) {
  //       getAddresses();
  //     }
  //   }
  // }, [addresses, user]);
  // End get user addresses

  const history = useHistory();

  const handleChange = (newAddress) => {
    changeOrder({ type: 'changeAddresToShip', addressToShip: newAddress });
  };

  const [showModal, setShowModal] = React.useState(false);
  const handleOpenAdreessesModal = () => {
    setShowModal(true);
  };

  const handleCloseAdreessesModal = () => {
    setShowModal(false);
  };

  const handleSelectAddress = (index) => {
    changeOrder({
      type: 'changeAddresToShip',
      addressToShip: addresses[index],
    });
    handleCloseAdreessesModal();
  };

  return (
    <>
      <Header subtitle={'Shipping Details'}>
        <Button onClick={() => history.push('/')} icon={'home'} />
        <Button
          onClick={() => history.push('/tag-constructor/sumary')}
          icon={'navigate_before'}
        />
      </Header>
      <AppBody>
        <div style={styles.divFlexRow}>
          <Button
            onClick={() => {
              handleOpenAdreessesModal();
            }}
            icon={'cloud_download'}
            style={styles.btnUnfilledGray}
          >
            Send to my saved address
          </Button>
          <Modal
            open={showModal}
            onClose={handleCloseAdreessesModal}
            showCloseIcon={false}
          >
            {addresses.length > 0 ? (
              <div style={styles.modalFlexColumn}>
                {addresses.map((address, index) => {
                  return (
                    <div key={index}>
                      <Button
                        onClick={() => {
                          handleSelectAddress(index);
                        }}
                        icon={'place'}
                        style={styles.btnUnfilledGray}
                      >
                        {address.street}
                      </Button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p>You must be logged in</p>
            )}
          </Modal>
        </div>
        <div style={styles.cardParent}>
          <AddressCard
            address={order.addressToShip}
            handleChange={handleChange}
          />
        </div>
        <SummaryTable
          TAGs={order.TAGs}
          tag_std_price={tag_std_price}
          shipping_price={shipping_price}
        />
        <div style={styles.divFlexRow}>
          <Button
            style={styles.btnFilledPurple}
            onClick={() => history.push('/tag-constructor/sumary')}
          >
            Back
          </Button>
          <Button
            style={styles.btnFilledPurple}
            onClick={() => {
              history.push('/tag-constructor/payment');
            }}
          >
            Payment
          </Button>
        </div>
      </AppBody>
      <Footer defaultButtons />
    </>
  );
}
