import React from 'react';
import { Route, Switch } from 'react-router-dom';
import UserProfilePage from '../../pages/UserProfilePage';
import UserPaymentsPage from '../../pages/UserPaymentsPage';
import UserAddressesPage from '../../pages/UserAddressesPage';
import UserOrdersPage from '../../pages/UserOrdersPage';

export default function UserParent() {
  return (
    <Switch>
      <Route path="/user/profile">
        <UserProfilePage />
      </Route>
      <Route path="/user/payments">
        <UserPaymentsPage />
      </Route>
      <Route path="/user/addresses">
        <UserAddressesPage />
      </Route>
      <Route path="/user/orders">
        <UserOrdersPage />
      </Route>
    </Switch>
  );
}
