import React from 'react';
import {Helmet} from 'react-helmet';
import {animated} from 'react-spring';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';

import {useFadeIn} from 'hooks';
import {Pane} from 'components';
import {InDevelopment} from 'assets';
import styles from './project.module.css';
import Project from './project';

const GradeAid = props => {
  const fadeIn = useFadeIn(5, null, true, {delay: 500});

  return (
    <Project color={props.color} animate={props.animate} transitionState={props.transitionState}>
      <Helmet>
        <title>Wal's Portfolio | Grade Aid</title>
        <style>{'body {color: var(--white)'}</style>
      </Helmet>
      <Pane>
        <div className={styles.container}>
          <animated.div style={fadeIn[4]} className={styles.feature} id={styles.featureID}><InDevelopment/></animated.div>
          <div className={styles.description}>
            <animated.h1 style={fadeIn[0]} className={styles.title}>Grade Aid</animated.h1>
            <animated.h3 style={fadeIn[1]} className={styles.subtitle}>In development</animated.h3>
            <animated.p style={fadeIn[2]}>
              A tool for storing your grades and easily calculating your average.
            </animated.p>
          </div>
        </div>
        <animated.div style={fadeIn[3]}>
          <Link to={{pathname: '/portfolio', state: {animate: true}}} className={styles.backButton} id={styles.gaBack}>
            <FontAwesomeIcon className={styles.backIcon} icon={faChevronLeft} size='lg'/>
            other projects
          </Link>
        </animated.div>
      </Pane>
    </Project>
  );
};

export default GradeAid;
