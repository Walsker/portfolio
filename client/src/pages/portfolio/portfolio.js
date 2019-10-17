import React, {useEffect} from 'react';
import {animated, useSpring} from 'react-spring';
import {Link} from 'react-router-dom';
import {disableBodyScroll, enableBodyScroll} from 'body-scroll-lock';

import styles from './portfolio.module.css';

const PortfolioProject = ({transitionState, color, animate}) => {
  useEffect(() => {
    disableBodyScroll();
    return enableBodyScroll;
  });

  const slideIn = useSpring({
    config: {clamp: true, mass: 1, tension: 280, friction: 30},
    width: (transitionState === 'entering' || transitionState === 'entered') ? '100%' : '0%',
    from: {width: '0%'}
  });

  const style = animate ? {backgroundColor: color, ...slideIn} : {backgroundColor: color};

  return (
    <animated.div className={styles.project} style={style}>
      <Link to='/portfolio' className={styles.back}>Back</Link>
    </animated.div>
  );
};
export default PortfolioProject;