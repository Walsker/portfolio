import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {animated, useSpring} from 'react-spring';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars, faTimes, faEnvelope} from '@fortawesome/free-solid-svg-icons';
import {
  faLinkedin,
  faGithub
} from '@fortawesome/free-brands-svg-icons';
import {disableBodyScroll, enableBodyScroll} from 'body-scroll-lock';
import styles from './index.module.css';

const Icon = ({icon, link}) => (
  <a className={styles.icon} target='_blank' rel='noopener noreferrer external' href={link}>
    <FontAwesomeIcon icon={icon} size='2x'/>
  </a>
);

const PageButton = ({close, path, label}) => (
  <Link onClick={close} className={styles.pageButton} to={path}>{label}</Link>
);

const Menu = ({close, style}) => {
  return (
    <animated.div id={styles.menuContainer} style={style}>
      <div id={styles.menuBar}>
        <div id={styles.menuLogo}>
          W<span id={styles.smallText}>AL</span>
        </div>
        <div id={styles.exitButton} onClick={close}>
          <FontAwesomeIcon icon={faTimes} size='2x'/>
        </div>
      </div>
      <div id={styles.menuContent}>
        <div id={styles.pageButtons}>
          <PageButton close={() => {close(); window.scrollTo(0, 0);}} path='/' label='Home'/>
          <PageButton close={() => {close(); window.scrollTo(0, 0);}} path='/projects' label='Projects'/>
          {/* <PageButton close={() => {close(); window.scrollTo(0, 0);}} path='/resume' label='Resume'/> */}
        </div>
        <div id={styles.socialIcons}>
          <Icon icon={faLinkedin} link='https://www.linkedin.com/in/wal-wal'/>
          <Icon icon={faGithub} link='https://github.com/Walsker'/>
          <Icon icon={faEnvelope} link='mailto:me@walcreates.ca'/>
        </div>
      </div>
    </animated.div>
  );
};

const Navbar = (props) => {
  const [isOpen, toggle] = useState(false);

  const slideIn = useSpring({
    config: {clamp: true, mass: 1, tension: 280, friction: 30},
    height: isOpen ? '100%' : '0%',
    from: {height: '0%'}
  });

  const logo = window.location.pathname === '/' ? (
    <div id={styles.logo} onClick={() => window.scrollTo({top: 0, left: 0, behavior: 'smooth'})}>
      W<span id={styles.subLogo}>AL</span>
    </div>
  ) : (
    <a id={styles.logo} href='/'>
      W<span id={styles.subLogo}>AL</span>
    </a>
  );

  return (
    <div id={styles.container}>
      {logo}
      <div 
        className={`${styles.menuButton} ${props.flipColor ? styles.blackButton : ''}`}
        onClick={() => {
          toggle(true);
          disableBodyScroll();
        }}>
        <FontAwesomeIcon icon={faBars} size='2x'/>
      </div>
      <Menu 
        close={() => {
          toggle(false);
          enableBodyScroll();
        }}
        style={slideIn}
      />
    </div>
  );
};

export default Navbar;
