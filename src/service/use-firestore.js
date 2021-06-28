import firebase from '../firebase';

export const useFirestore = () => {
  const db = firebase.firestore();
  const userColectionRef = db.collection('users');
  const ordersColectionRef = db.collection('orders');
  const messagesColectionRef = db.collection('messages');
  const availabilityColectionRef = db.collection('availability');

  /**
   *
   * POST   /users?uid=  Complete User
   * @param {String} uid
   * @param {Object} userData
   */
  const postNewUser = async (uid, userData) => {
    try {
      await db.runTransaction(async (transaction) => {
        const docRef = db.collection('users').doc(uid);
        const doc = await transaction.get(docRef);
        if (!doc.exists) transaction.set(docRef, userData);
      });
      console.log('User Document successfully added!');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };
  // End postNewUser

  /**
   *
   * GET    /users/all
   */
  const getAllUsers = async () => {
    console.log('getAllUsers: NOT DEVELOPED');
  };
  // End getAllUsers

  /**
   *
   * GET    /users?uid=
   * @param {String} uid
   */
  const getUserByUid = async (uid) => {
    console.log('getUserByUid: NOT DEVELOPED');
  };
  // End getUserByUid

  /**
   *
   * PUT    /users?uid= Field to Update
   * @param {String} uid
   * @param {Object} update
   */
  const updateUserByUid = async (uid, update) => {
    try {
      const docRef = await userColectionRef.doc(uid).update(update);
      console.log('User Document successfully updated!');
      return update;
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };
  // End updateUserByUid

  /**
   *
   * DELETE /users?uid=
   * @param {String} uid
   */
  const deleteUserByUid = async (uid) => {
    console.log('deleteUserByUid: NOT DEVELOPED');
  };
  // End deleteUserByUid

  /**
   *
   * POST   /users/address?uid=
   * @param {String} uid
   * @param {Object} address
   */
  const postUserNewAddressesByUid = async (uid, address) => {
    console.log('postUserNewAddressesByUid: NOT DEVELOPED');
  };
  // End postUserNewAddressesByUid

  /**
   *
   * GET    /users/address?uid=
   * @param {String} uid
   */
  const getUserAddressesByUid = async (uid) => {
    const docRef = userColectionRef.doc(uid);
    try {
      const doc = await docRef.get();
      if (doc.exists) {
        const userDoc = doc.data();
        return userDoc.addresses;
      } else {
        // doc.data() will be undefined in this case
        console.log('User Document not found in the DataBank');
      }
    } catch (error) {
      console.error('Error getting address: ', error);
    }
  };
  // End getUserAddressesByUid

  /**
   *
   * PUT    /users/address?uid=_&&index=
   * @param {String} uid
   * @param {Number} index
   * @param {Object} newAddress
   */
  const updateUserAddressByUidAndIndex = async (uid, index, newAddress) => {
    const docRef = userColectionRef.doc(uid);
    try {
      await db.runTransaction(async (t) => {
        const docData = await t.get(docRef);
        const addressArray = docData.data();
        const newAddressArray = addressArray.map((address, i) => {
          if (i === index) {
            return newAddress;
          } else {
            return address;
          }
        });
        t.update(docRef, {
          addresses: newAddressArray,
        });
        console.log('User Document Address successfully updated!');
        return { addresses: newAddressArray };
      });
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };
  // End updateUserAddressByUidAndIndex

  /**
   *
   * DELETE /users/address?uid=_&&index=
   * @param {String} uid
   * @param {Number} index
   */
  const deleteUserAddressByUidAndIndex = async (uid, index) => {
    console.log('deleteUserAddressByUidAndIndex: NOT DEVELOPED');
  };
  // End deleteUserAddressByUidAndIndex

  /**
   *
   * POST   /orders
   * @param {String} uid
   * @param {Object} newOrder
   */
  const postNewOrder = async (uid, newOrder) => {};
  // End postNewOrder

  /**
   *
   * GET    /orders/all
   */
  const getAllOrders = async () => {};
  // End getAllOrders

  /**
   *
   * GET    /orders?uid=
   * @param {String} uid
   */
  const getOrdersByUid = async (uid) => {};
  // End getOrdersByUid

  /**
   *
   * PUT    /orders?id=
   * @param {String} id
   * @param {Object} update
   */
  const updateOrdersById = async (id, update) => {};
  // End updateOrdersById

  /**
   *
   * DELETE /orders?id=
   * @param {String} id
   */
  const deleteOrdersById = async (id) => {};
  // End deleteOrdersById

  /**
   *
   * GET /availability
   */
  const getAvailability = async () => {
    const docRef = availabilityColectionRef.doc('standards');
    try {
      const document = await docRef.get();
      if (document.exists) {
        return document.data();
      } else {
        const standards = {
          fontsArray: [
            { description: 'Serif', value: 'serif' },
            { description: 'Arial', value: 'arial' },
            { description: 'Monospace', value: 'monospace' },
            { description: 'Chicle', value: 'Chicle' },
            { description: 'Fredoka One', value: 'Fredoka One' },
            { description: 'Lemon', value: 'Lemon' },
            { description: 'Salsa', value: 'Salsa' },
          ],
          insideColorArray: [
            { description: 'Black', value: 'black' },
            { description: 'Blue', value: 'blue' },
            { description: 'Red', value: 'red' },
          ],
          outsideColorArray: [
            { description: 'White', value: 'white' },
            { description: 'Yellow', value: 'yellow' },
            { description: 'Gray', value: 'light-gray' },
          ],
          tagPrices: { shipping_price: 10, tag_std_price: 1.2 },
        };
        docRef.set(standards);
        return standards;
      }
    } catch (error) {
      Promise.reject(error);
    }
  };
  // End getAvailability

  return {
    postNewUser,
    getAllUsers,
    getUserByUid,
    updateUserByUid,
    deleteUserByUid,
    postUserNewAddressesByUid,
    getUserAddressesByUid,
    updateUserAddressByUidAndIndex,
    deleteUserAddressByUidAndIndex,
    postNewOrder,
    getAllOrders,
    getOrdersByUid,
    updateOrdersById,
    deleteOrdersById,
    getAvailability,
  };
};
