import React, {useLayoutEffect, useRef, useState} from 'react';
import Stripe from './stripe';
import styles from './underline.module.css';

const Hover = ({color, children}) => {
  const stripeRef = useRef();
  const [dimensions, updateDimensions] = useState({width: 0, height: 0});

  const [isActive, toggleStripe] = useState(false);

  const widthDependency = stripeRef.current ? stripeRef.current.offsetWidth : null;
  const heightDependency = stripeRef.current ? stripeRef.current.offsetHeight : null;

  useLayoutEffect(() => updateDimensions({width: stripeRef.current.offsetWidth, height: stripeRef.current.offsetHeight}),
    [widthDependency, heightDependency]);

  return (
    <div 
      ref={stripeRef}
      className={styles.container}
      onMouseEnter={() => toggleStripe(true)}
      onMouseLeave={() => toggleStripe(false)}
    >
      <Stripe 
        className={styles.underline} 
        isActive={isActive} 
        width={dimensions.width} 
        style={{backgroundColor: color ? color : 'var(--primaryColor)', height: dimensions.height/2.5}}
      />
      {children}
    </div>
  );
};

const Static = ({color, children}) => {
  const stripeRef = useRef();
  const [dimensions, updateDimensions] = useState({width: 0, height: 0});

  const widthDependency = stripeRef.current ? stripeRef.current.offsetWidth : null;
  const heightDependency = stripeRef.current ? stripeRef.current.offsetHeight : null;

  useLayoutEffect(() => updateDimensions({width: stripeRef.current.offsetWidth, height: stripeRef.current.offsetHeight}), 
    [widthDependency, heightDependency]);

  return (
    <div 
      ref={stripeRef}
      className={styles.container}
    >
      <Stripe 
        className={styles.underline} 
        isActive={true} 
        width={dimensions.width} 
        style={{backgroundColor: color ? color : 'var(--primaryColor)', height: dimensions.height/2.5}}
      />
      {children}
    </div>
  );
};

const Animated = ({color, underlineRef, inView, children, ...rest}) => {
  const stripeRef = useRef();
  const [dimensions, updateDimensions] = useState({width: 0, height: 0});

  const widthDependency = stripeRef.current ? stripeRef.current.offsetWidth : null;
  const heightDependency = stripeRef.current ? stripeRef.current.offsetHeight : null;

  useLayoutEffect(() => updateDimensions({width: stripeRef.current.offsetWidth, height: stripeRef.current.offsetHeight}),
    [widthDependency, heightDependency]);

  return (
    <div 
      ref={stripeRef}
      className={styles.container}
      {...rest}
    >
      <Stripe 
        stripeRef={underlineRef}
        className={styles.underline} 
        isActive={inView} 
        width={dimensions.width} 
        style={{backgroundColor: color ? color : 'var(--primaryColor)', height: dimensions.height/2.5}}
      />
      {children}
    </div>
  );
};

export default {Hover, Static, Animated};
