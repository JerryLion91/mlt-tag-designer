// Libs
import React from 'react';

// Helpers
import { useAuth } from '../helpers/use-auth';
import { useHistory, useLocation } from 'react-router-dom';

// style Components
import Header from '../components/Header';
import AppBody from '../components/AppBody';
import Button from '../components/Button';
import Footer from '../components/Footer';

// functional Components
import SettingsButton from '../components/SettingsButton';
import Input from '../components/Input';
import MessageModal from '../components/MessageModal';

// Styles
import styles from '../styles/styles';

export default function ProfilePage() {
  const history = useHistory();
  const { from } = useLocation().state || { from: '/' };

  const auth = useAuth();
  if (auth.user === null) {
    history.push('/');
  }
  const { displayName, email, photoURL, uid } = auth.user;

  const userReducer = (state, action) => {
    const { type, input, value } = action;
    switch (type) {
      case 'change':
        return { ...state, [input]: value };
      default:
        throw new Error();
    }
  };
  const [userInfo, setUserInfo] = React.useReducer(userReducer, {
    name: displayName,
    email: email,
    oldPassword: '',
    newPassword: '',
    newPassword2: '',
  });

  const [pwdInput, setPwdInput] = React.useState(false);
  const handleUpdatePassword = () => setPwdInput(false);

  const handleForgotPassword = () => {
    setPwdInput(false);
    if (auth.user.emailVerified === false) {
      alert('EMAIL NOT VERIFIED');
    }
    auth.sendPasswordResetEmail(userInfo.email);
    alert('We will send you an email to change the password');
  };

  const goBack = () => {
    if (userInfo.name !== displayName) {
      console.log(displayName);
      alert('Confirm the name change first');
      return;
    }
    if (userInfo.email !== email) {
      alert('Confirm the email change first');
      return;
    }
    if (pwdInput) {
      alert('Confirm the password change first');
      return;
    }
    history.push(from);
  };

  const handleUpdateUserName = () => {
    auth.updateUserName(uid, userInfo.name).then(() => {
      setUserInfo({ type: 'change', input: 'name', value: '' });
      setUserInfo({
        type: 'change',
        input: 'name',
        value: auth.user.displayName,
      });
    });
  };

  const handleUpdateEmail = () => {
    auth
      .updateUserEmail(userInfo.email)
      .then(() => {
        setUserInfo({ type: 'change', input: 'email', value: '' });
        setUserInfo({ type: 'change', input: 'email', value: auth.user.email });
      })
      .catch((err) => {
        handleShowMessage(err);
      });
    console.log('EmailUpdated');
  };

  const redirectToLogin = (email) => {
    const userLocation = {
      pathname: '/login',
      state: { email: email },
    };
    history.push(userLocation);
  };

  // start modal code
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
    const { code, message } = props;
    switch (code) {
      case 'auth/requires-recent-login':
        modalDispatch({
          type: 'trigger',
          method: 'confirm',
          message: `${message} Do you want to register insted? `,
          value: userInfo.email,
          callback: redirectToLogin,
        });
        break;
      case 'auth/invalid-email':
        modalDispatch({ type: 'trigger', method: 'alert', message });
        break;
      default:
        console.log(props);
        console.log({ code, message });
        break;
    }
  };
  // end modal code

  return (
    <>
      <MessageModal state={modalState} dispatch={modalDispatch} />
      <Header subtitle="My Profile">
        <SettingsButton />
        <Button onClick={goBack} icon={'navigate_before'} />
      </Header>
      <AppBody>
        {photoURL && (
          <img
            src={photoURL}
            style={{ borderRadius: '50%', height: '10vh', margin: '20px' }}
            alt=""
          />
        )}
        <div style={{ position: 'relative', width: '80%' }}>
          <Input
            type="text"
            label="Username"
            value={userInfo.name}
            onChange={(newName) =>
              setUserInfo({ type: 'change', input: 'name', value: newName })
            }
          />
          {userInfo.name !== displayName ? (
            <Button
              style={{
                color: 'grey',
                fontSize: 'calc(8px + 1vmin)',
                position: 'absolute',
                right: '0',
                bottom: '0',
                margin: '0px 0px 20px 0px',
              }}
              onClick={handleUpdateUserName}
              icon={'save'}
            />
          ) : (
            <i
              style={{
                width: '30px',
                color: 'grey',
                fontSize: 'calc(15px + 1vmin)',
                position: 'absolute',
                right: '0',
                bottom: '0',
                margin: '0px 0px 20px 0px',
              }}
              className="material-icons"
            >
              checked
            </i>
          )}
        </div>
        <div style={{ position: 'relative', width: '80%' }}>
          <Input
            type="email"
            label="Email"
            value={userInfo.email}
            onChange={(newEmail) =>
              setUserInfo({ type: 'change', input: 'email', value: newEmail })
            }
          />
          {userInfo.email !== email ? (
            <Button
              style={{
                color: 'grey',
                fontSize: 'calc(8px + 1vmin)',
                position: 'absolute',
                right: '0',
                bottom: '0',
                margin: '0px 0px 20px 0px',
              }}
              onClick={handleUpdateEmail}
              icon={'save'}
            />
          ) : (
            <i
              style={{
                width: '30px',
                color: 'grey',
                fontSize: 'calc(15px + 1vmin)',
                position: 'absolute',
                right: '0',
                bottom: '0',
                margin: '0px 0px 20px 0px',
              }}
              className="material-icons"
            >
              checked
            </i>
          )}
        </div>
        {pwdInput ? (
          <div
            style={{ ...styles.cardParent, position: 'relative', width: '80%' }}
          >
            <i
              style={{
                width: '30px',
                color: 'grey',
                fontSize: 'calc(15px + 1vmin)',
                position: 'absolute',
                right: '0',
                top: '0',
                padding: '10px 0px',
                margin: '0px 0px 0px 0px',
              }}
              className="material-icons"
              onClick={() => {
                setPwdInput(false);
              }}
            >
              close
            </i>
            <Input
              type="password"
              label="Current Password"
              value={userInfo.oldPassword}
              onChange={(newValue) =>
                setUserInfo({
                  type: 'change',
                  input: 'oldPassword',
                  value: newValue,
                })
              }
            />
            <Input
              type="password"
              label="New Password"
              value={userInfo.newPassword}
              onChange={(newValue) =>
                setUserInfo({
                  type: 'change',
                  input: 'newPassword',
                  value: newValue,
                })
              }
            />
            <Input
              type="password"
              label="Repeat the Password"
              value={userInfo.newPassword2}
              onChange={(newValue) =>
                setUserInfo({
                  type: 'change',
                  input: 'newPassword2',
                  value: newValue,
                })
              }
            />
            <Button
              style={styles.btnFilledPurple}
              onClick={handleUpdatePassword}
            >
              Update
            </Button>
            <Button
              style={styles.btnUnfilledGray}
              onClick={handleForgotPassword}
            >
              Update password via email
            </Button>
          </div>
        ) : (
          <div>
            <Button
              style={styles.btnFilledPurple}
              onClick={() => setPwdInput(true)}
            >
              Change my Password
            </Button>
          </div>
        )}
      </AppBody>
      <Footer defaultButtons />
    </>
  );
}
