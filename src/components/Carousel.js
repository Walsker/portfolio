import React, {useRef} from 'react';
import {useTransition, animated} from 'react-spring';
import style from './carousel.module.css';

const Carousel = ({children, index}) => {

  // Creating refs to all the children in the carousel
  const childRefs = useRef(children);

  const windows = children.map((child, index) => <div key={index} className={style.container} style={{height: childRefs.current[index].props.height}}>{child}</div>);

  const transitions = useTransition(index % children.length, null, {
    from: {opacity: 0, transform: 'translate(-100px, 0)'},
    enter: {opacity: 1, transform: 'translate(0, 0)'},
    leave: {opacity: 0, transform: 'translate(100px, 0)'}
  });

  if (childRefs.current[index % children.length].props.height) {
    return transitions.map(({item, props, key}) => (
      <animated.div 
        key={key}
        style={props}
        className={style.window}
      >
        {windows[item]} 
      </animated.div>
    ));
  }
  else {
    return (
      <div className={style.container}>
        {transitions.map(({item, props, key}) => (
          <animated.div 
            key={key}
            style={props}
            className={style.window}
          >
            {windows[item]} 
          </animated.div>
        ))}
      </div>
    );
  }
};

export default Carousel;