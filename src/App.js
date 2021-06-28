// Libs
import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  useHistory,
} from 'react-router-dom';

// Components
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomeContactForm from './pages/HomeContactForm';

import ParentTagContructor from './components/Parents/ParentTagConstructor';
import ParentUser from './components/Parents/ParentUser';

// Helpers
import ScrollToTop from './helpers/ScrollToTop';
import MessageModal from './components/MessageModal';

// Providers
import { ProvideAuth, useAuth } from './helpers/use-auth.js';
import { CookiesProvider } from 'react-cookie';

export default function App() {
  const auth = useAuth();

  const modalReducer = (_, action) => {
    switch (action.type) {
      case 'trigger':
        const { method, message, value, callback } = action;
        return { showModal: true, method, message, value, callback };
      case 'response':
        if (action.callback) {
          action.callback(action.value);
        }
        return { showModal: false };
      default:
        throw new Error();
    }
  };

  const [modalState, modalDispatch] = React.useReducer(modalReducer, {
    showModal: false,
    method: null,
    message: null,
    value: null,
    callback: null,
  });

  const handleShowMessage = (props) => {
    const { code, message, values } = props;
    switch (code) {
      // Login errors
      case 'auth/user-not-found':
        modalDispatch({
          type: 'trigger',
          method: 'confirm',
          message: `${message} Do you want to register insted? `,
          value: values.email,
          callback: values.callback,
        });
        break;
      case 'auth/invalid-email':
      case 'auth/wrong-password':
        modalDispatch({ type: 'trigger', method: 'alert', message });
        break;
      case 'auth/cancelled-popup-request':
        break;
      // Register Errors
      case 'input/password-different':
      case 'auth/weak-password':
      case 'auth/email-already-in-use':
      case 'auth/invalid-email':
        modalDispatch({ type: 'trigger', method: 'alert', message });
        break;
      // profile/addresses Errors
      case 'address/invalid':
      case 'address/hide-unsaved':
        modalDispatch({ type: 'trigger', method: 'alert', message });
        break;
      case 'address/leave-unsaved':
        modalDispatch({
          type: 'trigger',
          method: 'confirm',
          message: message,
          callback: values.callback,
        });
        break;
      case 'form/response':
        modalDispatch({
          type: 'trigger',
          method: 'alert',
          message: message,
          callback: values.callback,
        });
        break;
      case 'tag/missingName':
        modalDispatch({
          type: 'trigger',
          method: 'confirm',
          message: message,
          callback: values.callback,
        });
        break;
      default:
        console.log({ code, message, values });
        break;
    }
  };

  return (
    <CookiesProvider>
      <ProvideAuth>
        <BrowserRouter>
          <ScrollToTop />
          <MessageModal state={modalState} dispatch={modalDispatch} />
          <Switch>
            <Route path="/login/register">
              {auth ? (
                <Redirect
                  to={{
                    pathname: '/',
                  }}
                />
              ) : (
                <RegisterPage showMessage={handleShowMessage} />
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
                <LoginPage showMessage={handleShowMessage} />
              )}
            </Route>
            <Route path="/tag-constructor">
              <ParentTagContructor showMessage={handleShowMessage} />
            </Route>
            <Route path="/user">
              <ParentUser showMessage={handleShowMessage} />
            </Route>
            <Route path="/contact-form">
              <HomeContactForm showMessage={handleShowMessage} />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </BrowserRouter>
      </ProvideAuth>
    </CookiesProvider>
  );
}
