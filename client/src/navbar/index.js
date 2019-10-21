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
import {Logo, Underline} from 'components';
import styles from './index.module.css';

const Icon = ({icon, link}) => (
  <a className={styles.icon} target='_blank' rel='noopener noreferrer external' href={link}>
    <FontAwesomeIcon icon={icon} size='2x'/>
  </a>
);

const PageButton = ({close, path, label, external}) => (
  <Underline.Hover color='var(--white)'>
    <Link onClick={close} className={styles.pageButton} to={path}>{label}</Link>
  </Underline.Hover>
);

const Menu = ({close, style}) => (
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
        <PageButton close={() => {close(); window.scrollTo(0, 0);}} path='/portfolio' label='Portfolio'/>
        <PageButton close={() => {close(); window.scrollTo(0, 0);}} path='/resume' label='Resume'/>
      </div>
      <div id={styles.socialIcons}>
        <Icon icon={faLinkedin} link='https://www.linkedin.com/in/wal-wal'/>
        <Icon icon={faGithub} link='https://github.com/Walsker'/>
        <Icon icon={faEnvelope} link='mailto:wal@walcreates.ca'/>
      </div>
    </div>
  </animated.div>
);

const Navbar = ({logoColor}) => {
  const [isOpen, toggle] = useState(false);

  const slideIn = useSpring({
    config: {clamp: true, mass: 1, tension: 280, friction: 30},
    height: isOpen ? '100%' : '0%',
    from: {height: '0%'}
  });

  return (
    <div id={styles.container}>
      <Logo color={logoColor || 'var(--primaryColor)'}/>
      <div 
        className={styles.menuButton}
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
