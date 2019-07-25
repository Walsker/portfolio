import React from 'react';
import {animated} from 'react-spring';
import {ReactComponent as Javascript} from './javascript.svg';
import {ReactComponent as Kandy} from './kandy.svg';
import {ReactComponent as Node} from './nodejs.svg';
import {ReactComponent as Ravens} from './ravens.svg';
import {ReactComponent as ReactSvg} from './react.svg';

const Logo = ({children, style, color}) => {
  return (
    <div className='logo'>
      <animated.div 
        style={{
          ...style,
          width: '100px',
          height: '100px',
          borderRadius: '100px',
          backgroundColor: color,
          opacity: style.opacity.interpolate(o => 1-o),
          transform: style.transform.interpolate(t => `${t} rotateX(180deg)`)
        }}/>
      <animated.div style={style}>
        {children}
      </animated.div>
    </div>
  );
};

const JavascriptLogo = props => <Logo {...props} color='#F9DC5C'><Javascript className='logo-svg'/></Logo>;
const KandyLogo = props => <Logo {...props} color='#303030'><Kandy className='logo-svg'/></Logo>;
const NodeLogo = props => <Logo {...props} color='#303030'><Node className='logo-svg'/></Logo>;
const RavensLogo = props => <Logo {...props} color='#000000'><Ravens className='logo-svg'/></Logo>;
const ReactLogo = props => <Logo {...props} color='#303030'><ReactSvg className='logo-svg'/></Logo>;

export {JavascriptLogo, KandyLogo, NodeLogo, RavensLogo, ReactLogo};