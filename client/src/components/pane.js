import React from 'react';
import {container, wrapper} from './pane.module.css';

// Basic pane component. Each pane is the size of the browser window but capped at a certain size
const Pane = ({children, inViewRef, style, ...rest}) => (
  <div ref={inViewRef} className={container} {...rest}>
    <div className={wrapper} style={style}>
      {children}
    </div>
  </div>
);

export default Pane;
