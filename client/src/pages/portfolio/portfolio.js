import React, {useEffect, useRef} from 'react';
import {Helmet} from 'react-helmet';
import {animated, useSpring} from 'react-spring';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';

import {useFadeIn} from 'hooks';
import {Pane} from 'components';
import styles from './project.module.css';
import Project from './project';

const Portfolio = props => {
  const fadeIn = useFadeIn(4, null, true, {delay: 500});
  
  return (
    <Project color={props.color} animate={props.animate} transitionState={props.transitionState}>
      <Helmet>
        <title>Wal's Portfolio | Portfolio</title>
        <style>{'body {color: var(--black)'}</style>
      </Helmet>
      <Pane>
        <div className={styles.landing}>
          <div className={styles.feature}><h1 id={styles.portfolioFeature} className='unselectable'>W</h1></div>
          <div className={styles.name}>
            <animated.h1 style={fadeIn[0]}>Portfolio</animated.h1>
            <animated.h3 style={fadeIn[1]} className={styles.subtitle}>You're already here!</animated.h3>
            <animated.p style={fadeIn[2]}>Here is where I display my work.</animated.p>
          </div>
        </div>
        <Link to={{pathname: '/portfolio', state: {animate: true}}} className={styles.backButton}>
          <FontAwesomeIcon className={styles.backButton} icon={faChevronLeft} size='lg'/>
        </Link>
      </Pane>
    </Project>
  );
};

export default Portfolio;
