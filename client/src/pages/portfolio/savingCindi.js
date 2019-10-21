import React from 'react';
import {Helmet} from 'react-helmet';
import {animated, useSpring} from 'react-spring';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';

import {useFadeIn} from 'hooks';
import {Pane, Underline} from 'components';
import {CuHackingLogo} from 'assets';
import styles from './project.module.css';
import Project from './project';

const SavingCindi = props => {
  const fadeIn = useFadeIn(4, null, true, {delay: 500});
  const logoFadeIn = useSpring({
    from: {opacity: 0},
    to: {opacity: 1},
    delay: 1500,
    config: {friction: 150}
  });
  
  return (
    <Project color={props.color} animate={props.animate} transitionState={props.transitionState}>
      <Helmet>
        <title>Wal's Portfolio | Saving Cindi</title>
        <style>{'body {color: var(--black)}'}</style>
      </Helmet>
      <Pane>
        <div className={styles.container}>
          <animated.div className={styles.feature} id={styles.featureID} style={logoFadeIn}><CuHackingLogo/></animated.div>
          <div className={styles.description}>
            <animated.h1 style={fadeIn[0]} className={styles.title}>Saving Cindi</animated.h1>
            <animated.h3 style={fadeIn[1]} className={styles.subtitle}>
              Coming soon!
              {/* <Underline.Hover color='var(--cuAccent)'>
                <a href='https://cuhacking.com' target='_blank' rel='noopener noreferrer external'>
                  savingcindi.com
                </a>
              </Underline.Hover> */}
            </animated.h3>
            <animated.p style={fadeIn[2]}>
              A magnificent band from Ottawa, Canada. Focused on delivering powerful R&B, Soul, and Jazz, they’re a group to be on the lookout for!
            </animated.p>
          </div>
        </div>
        <animated.div style={fadeIn[3]}>
          <Link to={{pathname: '/portfolio', state: {animate: true}}} className={styles.backButton} id={styles.scBack}>
            <FontAwesomeIcon className={styles.backIcon} icon={faChevronLeft} size='lg'/>
            other projects
          </Link>
        </animated.div>
      </Pane>
    </Project>
  );
};

export default SavingCindi;
