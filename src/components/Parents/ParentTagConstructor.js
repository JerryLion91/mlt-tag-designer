// Libs
import React from 'react';

// Helpers
import { Redirect, Route, Switch } from 'react-router-dom';

// functional Components
import TagContructorPage from '../../pages/TagConstructorPage';
import TagPaymentPage from '../../pages/TagPaymentPage';
import TagShippingPage from '../../pages/TagShippingPage';
import TagSubmitedPage from '../../pages/TagSubmitedPage';
import TagSumaryPage from '../../pages/TagSumaryPage';
import LoadingPage from '../../pages/LoadingPage';

// DataBank
import { useFirestore } from '../../service/use-firestore';
// import * as api from '../../service/apiService';

export default function TagConstructorParent({ showMessage }) {
  const firestore = useFirestore();

  const [availability, setAvailability] = React.useState(() => {
    firestore
      .getAvailability()
      .then((res) => {
        setAvailability(res);
      })
      .catch((err) => {
        console.error(err);
      });
  });

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

  const orderReducer = (state, action) => {
    const { type, tag } = action;
    const { tags } = state;
    switch (type) {
      case 'addTag':
        const newTags = Array.from(tags);
        newTags.push(tag);
        return { tags: newTags };
      case 'changeTag':
        return;
      case 'removeTag':
        return;
      default:
        throw new Error();
    }
  };

  const [order, dispatchOrder] = React.useReducer(orderReducer, {
    tags: [],
    addressToShip: blankAddress,
  });

  return (
    <>
      {!availability ? (
        <LoadingPage />
      ) : (
        <Switch>
          <Route path="/tag-constructor/sumary">
            {order.tags.length > 0 ? (
              <TagSumaryPage
                availability={availability}
                order={order}
                changeOrder={dispatchOrder}
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
              availability={availability}
              order={order}
              changeOrder={dispatchOrder}
            />
          </Route>
          <Route path="/tag-constructor/payment">
            <TagPaymentPage
              availability={availability}
              order={order}
              changeOrder={dispatchOrder}
            />
          </Route>
          <Route path="/tag-constructor/submited">
            <TagSubmitedPage order={order} />
          </Route>
          <Route path="/tag-constructor">
            <TagContructorPage
              availability={availability}
              changeOrder={dispatchOrder}
              showMessage={showMessage}
            />
          </Route>
        </Switch>
      )}
    </>
  );
}
