import React from 'react';
import style from './pane.module.css';

// Basic pane component. Each pane is the size of the browser window
const Pane = ({children, inViewRef, style: propStyle}) => (
  <div ref={inViewRef} className={style.container} style={propStyle}>
    {children}
  </div>
);

export default Pane;