import React from 'react';
import {button, buttons, container, logo} from './navbar.module.css';

const Button = ({label, target}) => (
  <div className={button} onClick={() => window.scrollTo({top: document.getElementById(target).offsetTop, left: 0, behavior: 'smooth'})}>
    {label}
  </div>
);

const Navbar = () => {
  
  return (
    <div id={container}>
      <svg id={logo} width='50' height='50'>
        <rect fill='red' width='100%' height='100%'/>
      </svg>
      <div id={buttons}>
        <Button label='about' target='About'/>
        <Button label='projects' target='Projects'/>
        {/* <Button label='resume'/> */}
        <Button label='contact' target='Contact'/>
      </div>
    </div>
  );
};
export default Navbar;