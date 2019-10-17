import React, {useEffect} from 'react';
import {animated, useSpring} from 'react-spring';
import {Link} from 'react-router-dom';
import {disableBodyScroll, enableBodyScroll} from 'body-scroll-lock';

import styles from './portfolio.module.css';

const CuHacking = () => {
  useEffect(() => {
    disableBodyScroll();
    return enableBodyScroll;
  });

  return (
    <>
      <Link to='/portfolio' className={styles.back}>Back</Link>
    </>
  );
};
export default CuHacking;