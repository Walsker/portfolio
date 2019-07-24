import React from 'react';
import {useTransition, animated} from 'react-spring';
import style from './carousel.module.css';

const Carousel = ({children, index}) => {
  const transitions = useTransition(index % children.length, null, {
    from: {opacity: 0, transform: 'translate(-100px, 0)'},
    enter: {opacity: 1, transform: 'translate(0, 0)'},
    leave: {opacity: 0, transform: 'translate(100px, 0)'}
  });

  return (
    <div className={style.container}>
      {transitions.map(({item, props, key}) => (
        <animated.div 
          key={key}
          style={props}
          className={style.window}
        >
          {children[item]} 
        </animated.div>
      ))}
    </div>
  );
};

export default Carousel;