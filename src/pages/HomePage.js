// Libs
import React from 'react';

// Helpers
import { useKeypress } from '../helpers/use-keypress';
import { useHistory } from 'react-router-dom';

// style Components
import Header from '../components/Header';
import AppBody from '../components/AppBody';
import Button from '../components/Button';
import Footer from '../components/Footer';

// functional Components
import SettingsButton from '../components/SettingsButton';
import TagDisplay from '../components/TagDisplay';
import ExamplesDisplay from '../components/ExamplesDisplay';

// Styles
import styles from '../styles/styles';

export default function HomePage() {
  const history = useHistory();

  // Shortcut to 'Design your tag' Button
  useKeypress('Enter', () => history.push('/tag-constructor'));

  return (
    <>
      <Header>
        <SettingsButton />
      </Header>
      <AppBody>
        <TagDisplay />
        <Button
          style={{
            ...styles.btnFilledPurple,
            // this btn inst in a parent div with width, alignSelf is solution
            alignSelf: 'center',
          }}
          onClick={() => history.push('/tag-constructor')}
          icon={''}
        >
          Design your tag
        </Button>
        <ExamplesDisplay />
      </AppBody>
      <Footer defaultButtons />
    </>
  );
}
