// Libs
import React from 'react';

// Helpers
import { useAuth } from '../helpers/use-auth';
import { useHistory, useLocation } from 'react-router-dom';

// Components
import Button from '../components/Button';
import Footer from '../components/Footer';
import MessageModal from '../components/MessageModal';
import RegisterForm from '../components/RegisterForm';
import SettingsButton from '../components/SettingsButton';
import LoadingComponent from '../components/LoadingComponent';

// Styles
import styles from '../styles/styles';

export default function RegisterPage() {
  const auth = useAuth();
  const history = useHistory();
  const { email: receivedEmail } = useLocation().state || { email: '' };

  const [isLoading, setIsLoading] = React.useState(false);

  const handleChange = (update) => {
    const { input, value } = update;
    setUserInput((prevState) => {
      return { ...prevState, [input]: value };
    });
  };

  const [userInput, setUserInput] = React.useState({
    name: '',
    password: '',
    repeatedPassword: '',
    email: '',
    address: null,
  });

  React.useEffect(() => {
    if (receivedEmail) handleChange({ input: 'email', value: receivedEmail });
  }, []);

  const handleRegister = () => {
    setIsLoading(true);
    const { name, password, repeatedPassword, email, address } = userInput;
    if (password !== repeatedPassword) {
      handleShowMessage({
        code: 'input/password-different',
        message: 'The two fields with password must be equal.',
      });
      return;
    }
    auth
      .signUp(email, password, name, address)
      .then((user) => {
        history.push('/');
        setIsLoading(false);
      })
      .catch((err) => {
        handleShowMessage(err);
      });
  };

  const modalReducer = (state, action) => {
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
      case 'input/password-different':
      case 'auth/weak-password':
      case 'auth/email-already-in-use':
      case 'auth/invalid-email':
        modalDispatch({ type: 'trigger', method: 'alert', message });
        break;
      default:
        console.log(props);
        break;
    }
  };

  const signInWithGoogle = () => {
    setIsLoading(true);
    auth.signInWithGooglePopup(() => {
      history.push('/');
      setIsLoading(false);
    });
  };

  return (
    <>
      <MessageModal state={modalState} dispatch={modalDispatch} />
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
          src={'../logoLogin.svg'}
          alt={''}
          style={{ height: '60vh', maxHeight: '120px' }}
        />
        <span style={{ fontSize: 'calc(20px + 1.8vmin)', margin: '10px' }}>
          M.L.T. Designs
        </span>
      </header>
      <div style={styles.divFlexColumn}>
        <span style={styles.loginHeading1}>Register</span>
        <span style={styles.loginHeading2}>Hello! Please to meet you.</span>
        {isLoading ? (
          <LoadingComponent height={'20vh'} />
        ) : (
          <>
            <RegisterForm state={userInput} onChange={handleChange} />
            <Button
              style={styles.btnFilledPurple}
              onClick={handleRegister}
              icon={''}
            >
              Register
            </Button>
            <div style={{ position: 'relative' }}>
              <img
                src={'../google.jpg'}
                alt={''}
                style={{
                  height: 'calc(29px + 1vh)',
                  width: 'calc(29px + 1vh)',
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
                sign up with Google
              </Button>
            </div>
          </>
        )}
      </div>
      <Footer defaultButtons />
    </>
  );
}
