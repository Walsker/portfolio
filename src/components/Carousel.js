import React from 'react';
import {useTransition, animated} from 'react-spring';

const Carousel = ({children, index}) => {
  const transitions = useTransition(index % children.length, null, {
    from: {opacity: 0, transform: 'translate(-100px, 0)'},
    enter: {opacity: 1, transform: 'translate(0, 0)'},
    leave: {opacity: 0, transform: 'translate(100px, 0)'}
  });

  return (
    <div className='carouselContainer'>
      {transitions.map(({item, props, key}) => (
        <animated.div 
          key={key}
          style={props}
        >
          {children[item]} 
        </animated.div>
      ))}
    </div>
  );
};

export default Carousel;