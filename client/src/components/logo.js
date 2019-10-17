import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import styles from './logo.module.css';

const Logo = ({color}) => {
  const {pathname} = useLocation();
  if (pathname === '/') {
    return (
      <div id={styles.logo} style={{backgroundColor: color}} onClick={() => window.scrollTo({top: 0, left: 0, behavior: 'smooth'})}>
        W<span id={styles.subLogo}>AL</span>
      </div>
    );
  } else {
    return (
      <Link id={styles.logo} style={{backgroundColor: color}} to='/'>
        W<span id={styles.subLogo}>AL</span>
      </Link>
    );
  }
};

export default Logo;