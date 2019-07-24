import React from 'react';

// Basic pane component. Each pane is the size of the browser window
const Pane = ({children, inViewRef}) => (
  <div ref={inViewRef} className='pane'>
    {children}
  </div>
);

export default Pane;