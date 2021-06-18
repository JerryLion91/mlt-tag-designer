import React from 'react';
import AppBody from '../components/AppBody';
import Footer from '../components/Footer';
import Header from '../components/Header';

// Styles
import styles from '../styles/styles';

export default function LoadingPage() {
  return (
    <>
      <Header />
      <AppBody>
        <img style={styles.loadingGif} src={'loading.gif'} alt="loading..." />
      </AppBody>
      <Footer />
    </>
  );
}
