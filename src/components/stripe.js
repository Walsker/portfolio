import React from 'react';
import {animated, useSpring} from 'react-spring';
import {container} from './stripe.module.css';

const Stripe = ({stripeRef, inView, className, ...props}) => {
  const {length} = useSpring({
    ref: stripeRef,
    config: {clamp: true, friction: 22},
    from: {length: 0},
    to: {length: inView ? window.screen.width : 0}
  });

  return (
    <animated.div
      className={`${container} ${className}`}
      style={{width: length, ...props.style}}
    />
  );
};

export default Stripe;
