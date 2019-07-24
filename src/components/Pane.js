import React from 'react';
import style from './pane.module.css';

// Basic pane component. Each pane is the size of the browser window
const Pane = ({children, inViewRef}) => (
  <div ref={inViewRef} className={style.container}>
    {children}
  </div>
);

export default Pane;