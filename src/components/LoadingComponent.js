import React from 'react';

import styles from '../styles/styles';

export default function LoadingComponent({ height }) {
  return (
    <div style={{ height: `${height}px`, display: 'flex' }}>
      <img style={styles.loadingGif} src={'loading.gif'} alt="loading..." />
    </div>
  );
}
