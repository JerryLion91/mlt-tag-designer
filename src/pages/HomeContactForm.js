import React from 'react';
import AppBody from '../components/AppBody';
import Button from '../components/Button';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SettingsButton from '../components/SettingsButton';
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../helpers/use-auth';

export default function HomeContactForm() {
  const auth = useAuth();
  let location = useLocation();
  let history = useHistory();
  let { from } = location.state || { from: '/' };

  return (
    <>
      <Header>
        <SettingsButton />
        <Button onClick={() => history.push(from)} icon={'navigate_before'} />
      </Header>
      <AppBody>HomeContactForm</AppBody>
      <Footer defaultButtons />
    </>
  );
}
