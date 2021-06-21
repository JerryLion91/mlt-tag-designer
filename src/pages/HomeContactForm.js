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

// Styles
import styles from '../styles/styles';
import TextArea from '../components/TextArea';
import LoadingComponent from '../components/LoadingComponent';

export default function HomeContactForm() {
  const auth = useAuth();
  const location = useLocation();
  const history = useHistory();
  const { from } = location.state || { from: '/' };

  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (auth.user) {
      const { user } = auth;
      const { displayName, email, phoneNumber } = user;
      if (displayName) {
        dispatchForm({
          type: 'change',
          input: 'name',
          value: displayName,
        });
      }
      if (email) {
        dispatchForm({
          type: 'change',
          input: 'email',
          value: email,
        });
      }
      if (phoneNumber) {
        dispatchForm({
          type: 'change',
          input: 'phoneNumber',
          value: phoneNumber,
        });
      }
    }
  }, [auth]);

  const formReducer = (state, action) => {
    const { type, input, value } = action;
    switch (type) {
      case 'change':
        return { ...state, [input]: value };

      default:
        throw new Error();
    }
  };

  const [form, dispatchForm] = React.useReducer(formReducer, {
    name: '',
    email: '',
    phoneNumber: '',
    subject: '',
    message: '',
  });

  return (
    <>
      <Header>
        <SettingsButton />
        <Button onClick={() => history.push(from)} icon={'navigate_before'} />
      </Header>
      {isLoading ? (
        <LoadingComponent height={'80vh'} />
      ) : (
        <AppBody>
          <form style={{ ...styles.divFlexColumn, alignItems: 'center' }}>
            <Input
              type="text"
              label="Name"
              value={form.name}
              onChange={(newName) => {
                dispatchForm({ type: 'change', input: 'name', value: newName });
              }}
              width={'80%'}
            />
            <Input
              type="email"
              label="E-mail"
              value={form.email}
              onChange={(newName) => {
                dispatchForm({ type: 'change', input: 'name', value: newName });
              }}
              width={'80%'}
            />
            <Input
              type="text"
              label="Phone Number"
              helper="Optional"
              value={form.phoneNumber}
              onChange={(newPhone) => {
                dispatchForm({
                  type: 'change',
                  input: 'phoneNumber',
                  value: newPhone,
                });
              }}
              width={'80%'}
            />
            <Input
              type="text"
              label="Subject"
              value={form.subject}
              onChange={(newValue) => {
                dispatchForm({
                  type: 'change',
                  input: 'subject',
                  value: newValue,
                });
              }}
              width={'80%'}
            />
            <TextArea
              label="Message"
              helper=""
              value={form.message}
              onChange={(newValue) => {
                dispatchForm({
                  type: 'change',
                  input: 'message',
                  value: newValue,
                });
              }}
              width={'80%'}
            />
            <Button
              style={{
                ...styles.btnFilledPurple,
                // this btn inst in a parent div with width, alignSelf is solution
                alignSelf: 'center',
              }}
              onClick={() => history.push('/tag-constructor')}
              icon={''}
            >
              Send message
            </Button>
          </form>
        </AppBody>
      )}
      <Footer defaultButtons />
    </>
  );
}
