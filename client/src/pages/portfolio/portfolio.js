import React from 'react';
import {Helmet} from 'react-helmet';
import {animated} from 'react-spring';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';

import {useFadeIn} from 'hooks';
import {Pane} from 'components';
import {WalLogo} from 'assets';
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
        <div className={styles.container}>
          <div className={styles.feature} id={styles.featureID}><WalLogo/></div>
          <div className={styles.description}>
            <animated.h1 style={fadeIn[0]} className={styles.title}>Portfolio</animated.h1>
            <animated.h3 style={fadeIn[1]} className={styles.subtitle}>You're already here!</animated.h3>
            <animated.p style={fadeIn[2]}>
              This website was created as a central location to allow for peers and professionals to keep up with my latest projects. It focuses on using horizontally animated stripes to convey the quintessence of my motto - keep moving forward.
            </animated.p>
          </div>
        </div>
        <animated.div style={fadeIn[3]}>
          <Link to={{pathname: '/portfolio', state: {animate: true}}} className={styles.backButton} id={styles.portfolioBack}>
            <FontAwesomeIcon className={styles.backIcon} icon={faChevronLeft} size='lg'/>
            other projects
          </Link>
        </animated.div>
      </Pane>
    </Project>
  );
};

export default Portfolio;
