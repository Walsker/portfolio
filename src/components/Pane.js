import React from 'react';
import {container, wrapper} from './pane.module.css';

// Basic pane component. Each pane is the size of the browser window
// const Pane = ({children, inViewRef, style, ...rest}) => (
//   <div ref={inViewRef} className={css.container} style={style} {...rest}>
//     {children}
//   </div>
// );
const Pane = ({children, inViewRef, style, ...rest}) => (
  <div ref={inViewRef} className={container} style={style} {...rest}>
    <div className={wrapper}>
      {children}
    </div>
  </div>
);
export default Pane;