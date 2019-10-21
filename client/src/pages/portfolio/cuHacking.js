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

const CuHacking = props => {
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
        <title>Wal's Portfolio | cuHacking</title>
        <style>{'body {color: white'}</style>
      </Helmet>
      <Pane>
        <div className={styles.container}>
          <animated.div className={styles.feature} id={styles.featureID} style={logoFadeIn}><CuHackingLogo/></animated.div>
          <div className={styles.description}>
            <animated.h1 style={fadeIn[0]} className={styles.title} id={styles.cuTitle}>cuHacking</animated.h1>
            <animated.h3 style={fadeIn[1]} className={styles.subtitle}>
              <Underline.Hover color='var(--cuAccent)'>
                <a href='https://cuhacking.com' target='_blank' rel='noopener noreferrer external'>
                  cuhacking.com
                </a>
              </Underline.Hover>
            </animated.h3>
            <animated.p style={fadeIn[2]}>
              As Director of Development, my role is to develop the software which cuHacking uses. Of course, I'm not alone. I lead a team of six other skilled developers in making what we believe is the most ambitious undertaking for cuHacking yet.
              <br/><br/>
              To stand out from other hackathons, I've designed the "cuPlatform" - a collection of online services for attendees, organizers, and sponsors of the hackathon. Its purpose is to digitize parts of the event, such as registration, to make them more efficient.
            </animated.p>
          </div>
        </div>
        <animated.div style={fadeIn[3]}>
          <Link to={{pathname: '/portfolio', state: {animate: true}}} className={styles.backButton} id={styles.cuBack}>
            <FontAwesomeIcon className={styles.backIcon} icon={faChevronLeft} size='lg'/>
            other projects
          </Link>
        </animated.div>
      </Pane>
    </Project>
  );
};

export default CuHacking;
