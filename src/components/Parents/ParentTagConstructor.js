import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import TagContructorPage from '../../pages/TagConstructorPage';
import TagPaymentPage from '../../pages/TagPaymentPage';
import TagShippingPage from '../../pages/TagShippingPage';
import TagSubmitedPage from '../../pages/TagSubmitedPage';
import TagSumaryPage from '../../pages/TagSumaryPage';

// DataBank
// import { useFirestore } from '../../service/use-firestore';
// import * as api from '../../service/apiService';

export default function TagConstructorParent() {
  // const firestore = useFirestore();

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

  const [stadards, setStadards] = React.useState(null);
  const getStandards = async () => {
    try {
      // const data = await firestore.getAvailability();
      // setStadards(data);
    } catch (error) {
      console.error('Cannot retrive standards data' + error);
    }
  };

  React.useEffect(() => {
    getStandards();
  }, []);

  const [addressToShip, setAddressToShip] = React.useState(blankAddress);

  const [shippingPrice, setShippingPrice] = React.useState(10);

  const handleChangeAddress = (newAddress) => {
    setAddressToShip(newAddress);
  };

  const handleChangeShippingPrice = (newPrice) => {
    setShippingPrice(newPrice);
  };

  const [TAGs, setTAGs] = React.useState([]);

  const handleAddTag = (tag) => {
    let currentIndex = 0;
    if (TAGs.length > 0) {
      currentIndex = TAGs[0].currentIndex + 1;
    }
    setTAGs((prevState) => [
      { currentIndex: currentIndex, ...tag },
      ...prevState,
    ]);
  };

  const handleChangeTag = (index, newTag) => {
    setTAGs((prevState) => {
      prevState[index] = newTag;
      return [...prevState];
    });
  };

  const handleRemoveTag = (index) => {
    setTAGs((prevState) => {
      const newTAGs = prevState.filter((_, i) => {
        return i !== index;
      });
      return newTAGs;
    });
  };

  return (
    <Switch>
      <Route path="/tag-constructor/sumary">
        {TAGs.length > 0 ? (
          <TagSumaryPage
            TAGs={TAGs}
            onChange={handleChangeTag}
            onRemove={handleRemoveTag}
          />
        ) : (
          <Redirect
            to={{
              pathname: '/tag-constructor',
            }}
          />
        )}
      </Route>
      <Route path="/tag-constructor/shipping">
        <TagShippingPage
          TAGs={TAGs}
          addressToShip={addressToShip}
          handleChangeAddress={handleChangeAddress}
          shippingPrice={shippingPrice}
          handleChangeShippingPrice={handleChangeShippingPrice}
        />
      </Route>
      <Route path="/tag-constructor/payment">
        <TagPaymentPage TAGs={TAGs} shippingPrice={shippingPrice} />
      </Route>
      <Route path="/tag-constructor/submited">
        <TagSubmitedPage TAGs={TAGs} />
      </Route>
      <Route path="/tag-constructor">
        <TagContructorPage TAGs={TAGs} onAddTag={handleAddTag} />
      </Route>
    </Switch>
  );
}
