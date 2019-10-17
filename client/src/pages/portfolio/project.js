import React, {useEffect, useRef} from 'react';
import {animated, useSpring} from 'react-spring';
import {disableBodyScroll, enableBodyScroll} from 'body-scroll-lock';

import {Logo} from 'components';
import styles from './project.module.css';

const Project = props => {
  useEffect(() => {
    disableBodyScroll();
    return enableBodyScroll;
  });

  const fadeIn = useSpring({opacity: props.transitionState === 'entered' ? 1 : 0});
  
  const slideIn = useSpring({
    config: {clamp: true, mass: 1, tension: 280, friction: 30},
    width: (props.transitionState === 'entering' || props.transitionState === 'entered') ? '100%' : '0%',
    from: {width: '0%'}
  });
  const style = props.animate ? {backgroundColor: props.color, ...slideIn} : {backgroundColor: props.color};

  return (
    <animated.div className={styles.project} style={style}>
      <animated.div style={fadeIn} className={styles.navBar}>
        <Logo color={props.color}/>
      </animated.div>
      {props.children}
    </animated.div>
  );
};

export default Project;
