import React from 'react';
import {button, buttons, container, logo} from './navbar.module.css';

const Button = ({label, id}) => (
  <div className={button} onClick={() => window.scrollTo({top: window.innerHeight*id, left: 0, behavior: 'smooth'})}>
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
        <Button label='about' id={1}/>
        <Button label='projects' id={2}/>
        {/* <Button label='resume'/> */}
        <Button label='contact' id={3}/>
      </div>
    </div>
  );
};
export default Navbar;