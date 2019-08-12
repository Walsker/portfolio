import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {animated, useSpring} from 'react-spring';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars, faTimes} from '@fortawesome/free-solid-svg-icons';
import {
  faLinkedin,
  faTwitter,
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
          <Icon icon={faTwitter} link='https://twitter.com'/>
        </div>
      </div>
    </animated.div>
  );
};

const Navbar = () => {
  const [isOpen, toggle] = useState(false);

  const {length} = useSpring({
    config: {clamp: true, mass: 1, tension: 280, friction: 30},
    length: isOpen ? '100%' : '0%',
    from: {length: '0%'}
  });

  return (
    <div id={styles.container}>
      <div id={styles.logo} onClick={() => window.scrollTo({top: 0, left: 0, behavior: 'smooth'})}>
        W<span id={styles.subLogo}>AL</span>
      </div>
      <div 
        className={`${styles.menuButton} ${window.location.pathname === '/projects' ? styles.blackButton : ''}`}
        onClick={() => {
          toggle(true);
          disableBodyScroll();
        }}>
        <FontAwesomeIcon icon={faBars} size='2x' style={{stroke: 'blue', strokeWidth: '2px'}}/>
      </div>
      <Menu 
        close={() => {
          toggle(false);
          enableBodyScroll();
        }}
        style={{
          clipPath: length.interpolate(length => `polygon(0 0px, 100% 0px, 100% ${length}, 0px ${length})`)
        }}
      />
    </div>
  );
};

export default Navbar;
