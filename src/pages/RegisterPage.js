// Libs
import React from 'react';

// Helpers
import { useAuth } from '../helpers/use-auth';
import { useHistory, useLocation } from 'react-router-dom';

// components
import Button from '../components/Button';
import Footer from '../components/Footer';
import MessageModal from '../components/MessageModal';
import RegisterForm from '../components/RegisterForm';

// Styles
import styles from '../styles/styles';

export default function RegisterPage() {
  const auth = useAuth();
  const history = useHistory();
  const { email: receivedEmail } = useLocation().state || { email: '' };

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

  return (
    <>
      <MessageModal state={modalState} dispatch={modalDispatch} />
      <header style={styles.loginHeader}>
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
        <RegisterForm state={userInput} onChange={handleChange} />
        <Button
          style={styles.btnFilledPurple}
          onClick={handleRegister}
          icon={''}
        >
          Register
        </Button>
      </div>
      <Footer defaultButtons />
    </>
  );
}
