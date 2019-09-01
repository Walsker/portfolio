import React from 'react';
import {Helmet} from 'react-helmet';
import styles from './index.module.css';
import theGif from 'assets/andIOop.gif';

const NotFound = () => (
  <>
    <Helmet>
      <title>Error 404</title>
    </Helmet>
    <div id={styles.container}>
      <img id={styles.gif} src={theGif} alt="and i oop" />
      {/* <p><a href="https://giphy.com/gifs/and-i-oop-l0R1mVDC59K9VjsHIP">via GIPHY</a></p> */}
      {/* <h2>Error 404</h2> */}
      <h2>Page not found</h2>
      404
    </div>
  </>
);

export default NotFound;