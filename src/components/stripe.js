import React from 'react';
import {animated, useSpring} from 'react-spring';

const Stripe = ({stripeRef, inView, top, size, colour, style}) => {
  const {length} = useSpring({
    ref: stripeRef,
    config: {clamp: true, friction: 22},
    from: {length: 0},
    to: {length: inView ? window.innerWidth : 0}
  });

  return (
    <svg width='100%' height={size} style={{position: 'absolute', top, ...style}}>
      <animated.rect x='0' y='0' width={length} height='100%' fill={colour}></animated.rect>
    </svg>
  );
};

export default Stripe;
