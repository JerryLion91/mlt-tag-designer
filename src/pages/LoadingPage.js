// Libs
import React from 'react';

// Components
import Header from '../components/Header';
import AppBody from '../components/AppBody';
import Footer from '../components/Footer';

// Styles
import styles from '../styles/styles';

export default function LoadingPage() {
  return (
    <>
      <Header />
      <AppBody>
        <img
          style={styles.loadingGif}
          src={'../loading.gif'}
          alt="loading..."
        />
      </AppBody>
      <Footer />
    </>
  );
}
