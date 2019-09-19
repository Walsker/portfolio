import React from 'react';
import {animated, useSpring} from 'react-spring';
import {container} from './stripe.module.css';

const Stripe = ({stripeRef, isActive, className, width, ...props}) => {
  const {length} = useSpring({
    ref: stripeRef ? stripeRef : undefined,
    config: {clamp: true, friction: 22},
    from: {length: 0},
    to: {length: isActive ? (width ? width: window.screen.width) : 0}
  });

  return (
    <animated.div
      className={`${container} ${className}`}
      style={{width: length, ...props.style}}
    />
  );
};

export default Stripe;
