// Libs
import React from 'react';

// Helpers
import { useAuth } from '../helpers/use-auth';
import { useHistory, useLocation } from 'react-router-dom';

// Components
import Button from '../components/Button';
import Footer from '../components/Footer';
import Input from '../components/Input';
import SettingsButton from '../components/SettingsButton';
import LoadingComponent from '../components/LoadingComponent';

// Styles
import styles from '../styles/styles';

export default function LoginPage({ showMessage }) {
  const auth = useAuth();
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/' } };
  const { email: receivedEmail } = location.state || { email: '' };

  const [isLoading, setIsLoading] = React.useState(false);

  const userReducer = (state, action) => {
    switch (action.type) {
      case 'email':
        return { ...state, email: action.value };
      case 'password':
        return { ...state, password: action.value };
      default:
        throw new Error();
    }
  };
  const [userInput, dispatchUserInput] = React.useReducer(userReducer, {
    email: '',
    password: '',
  });

  const signInWithEmail = () => {
    const { email, password } = userInput;
    auth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        // Signed in ... console.log(user);
        history.push(from.pathname);
      })
      .catch((err) => {
        showMessage({
          ...err,
          values: { email: email, callback: redirectToRegister },
        });
      });
  };

  const signInWithGoogle = () => {
    setIsLoading(true);
    auth.signInWithGooglePopup(() => {
      setIsLoading(false);
      history.push(from.pathname);
    });
  };

  const handleForgotPassword = () => {
    const { email } = userInput;
    auth
      .sendPasswordResetEmail(email)
      .then((res) => {
        showMessage({ ...res, values: { email: email } });
      })
      .catch((err) => {
        showMessage({ ...err, values: { email: email } });
      });
  };

  const redirectToRegister = (email) => {
    const userLocation = {
      pathname: '/login/register',
      state: { email: email },
    };
    history.push(userLocation);
  };

  return (
    <>
      <header style={styles.loginHeader}>
        <div
          style={{
            minWidth: '270px',
            maxWidth: '450px',
            width: '80%',
            height: '2vh',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'stretch',
            flexDirection: 'row-reverse',
          }}
        >
          <SettingsButton />
          <Button onClick={() => history.push('/')} icon={'navigate_before'} />
        </div>
        <img
          src={'logoLogin.svg'}
          alt={''}
          style={{ height: '60vh', maxHeight: '120px' }}
        />
        <span style={{ fontSize: 'calc(20px + 1.8vmin)', margin: '10px' }}>
          M.L.T. Designs
        </span>
      </header>
      <div style={styles.divFlexColumn}>
        <span style={styles.loginHeading1}>Login</span>
        <span style={styles.loginHeading2}>
          Hi there! Nice to see you again
        </span>
        {isLoading ? (
          <LoadingComponent height={'20vh'} />
        ) : (
          <>
            <Input
              type="email"
              label="Email"
              value={userInput.email}
              onChange={(newEmail) =>
                dispatchUserInput({ type: 'email', value: newEmail })
              }
            />
            <Input
              type="password"
              label="Password"
              value={userInput.password}
              onChange={(newPassword) =>
                dispatchUserInput({ type: 'password', value: newPassword })
              }
            />
            <Button
              style={styles.btnFilledPurple}
              onClick={signInWithEmail}
              icon={''}
            >
              Login
            </Button>
            <div style={styles.divFlexRow}>
              <Button
                style={styles.btnUnfilledGray}
                onClick={handleForgotPassword}
              >
                Forgot Password?
              </Button>
              <Button
                style={styles.btnUnfilledColor}
                onClick={() => history.push('/login/register')}
              >
                Register
              </Button>
            </div>
            <div style={{ position: 'relative' }}>
              <img
                src={'../google.jpg'}
                alt={''}
                style={{
                  height: 'calc(29px + 1vh)',
                  position: 'absolute',
                  left: '0',
                  bottom: '0',
                  padding: '0px',
                  margin: '25px 0px 5px 0px',
                  border: 'solid 1px #520369',
                  borderRadius: '5px',
                }}
              />
              <Button
                style={styles.btnFilledPurple}
                onClick={signInWithGoogle}
                icon={''}
              >
                sign in with Google
              </Button>
            </div>
          </>
        )}
      </div>
      <Footer defaultButtons />
    </>
  );
}
