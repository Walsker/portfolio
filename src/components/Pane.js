import React from 'react';
import css from './pane.module.css';

// Basic pane component. Each pane is the size of the browser window
const Pane = ({children, inViewRef, style, ...rest}) => (
  <div ref={inViewRef} className={css.container} style={style} {...rest}>
    {children}
  </div>
);

export default Pane;