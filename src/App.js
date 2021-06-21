// Libs
import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

// Components
import HomePage from './pages/HomePage';
import LoadingPage from './pages/LoadingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomeContactForm from './pages/HomeContactForm';

import ParentTagContructor from './components/Parents/ParentTagConstructor';
import ParentUser from './components/Parents/ParentUser';

// Helpers
import ScrollToTop from './helpers/ScrollToTop';

// Providers
import { ProvideAuth, useAuth } from './helpers/use-auth.js';

export default function App() {
  const auth = useAuth();

  return (
    <ProvideAuth>
      <BrowserRouter>
        <ScrollToTop />
        <Switch>
          <Route path="/login/register">
            {auth ? (
              <Redirect
                to={{
                  pathname: '/',
                }}
              />
            ) : (
              <RegisterPage />
            )}
          </Route>
          <Route path="/login">
            {auth ? (
              <Redirect
                to={{
                  pathname: '/',
                }}
              />
            ) : (
              <LoginPage />
            )}
          </Route>
          <Route path="/tag-constructor">
            <ParentTagContructor />
          </Route>
          <Route path="/user">
            <ParentUser />
          </Route>
          <Route path="/contact-form">
            <HomeContactForm />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </BrowserRouter>
    </ProvideAuth>
  );
}
