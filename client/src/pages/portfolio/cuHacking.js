import React, {useEffect} from 'react';
import {animated, useSpring} from 'react-spring';
import {Link} from 'react-router-dom';
import {disableBodyScroll, enableBodyScroll} from 'body-scroll-lock';

import styles from './portfolio.module.css';

const CuHacking = ({transitionState, color}) => {
  useEffect(() => {
    disableBodyScroll();
    return enableBodyScroll;
  });

  const slideIn = useSpring({
    config: {clamp: true, mass: 1, tension: 280, friction: 30},
    width: (transitionState === 'entering' || transitionState === 'entered') ? '100%' : '0%',
    from: {width: '0%'}
  });

  return (
    <animated.div className={styles.project} style={{backgroundColor: color, ...slideIn}}>
      <Link to='/portfolio' className={styles.back}>Back</Link>
    </animated.div>
  );
};
export default CuHacking;