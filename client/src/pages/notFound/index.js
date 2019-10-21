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
      <h2>Page not found</h2>
      404
    </div>
  </>
);

export default NotFound;