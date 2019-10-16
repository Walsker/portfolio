import React, {useEffect, useState} from 'react';
import {Helmet} from 'react-helmet';
import {Link} from 'react-router-dom';
import {useInView} from 'react-intersection-observer';
import {animated, config, interpolate, useChain, useSpring} from 'react-spring';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons';
import {GradeAidLogo} from 'assets';
import {Pane, Stripe} from 'components';
import {useFadeIn} from 'hooks';
import styles from './index.module.css';


const ProjectButton = ({label, link, color}) => {
  const [isHovering, toggleHover] = useState(false);

  return (
    <div className={styles.project} onMouseEnter={() => toggleHover(true)} onMouseLeave={() => toggleHover(false)}>
      <Stripe className={styles.projectStripe} isActive={isHovering} style={{backgroundColor: color, backgroundImage: color}}/>
      <h1>{label}</h1>
    </div>
  );
};

const Portfolio = () => {
  return (
    <Pane>
      <Helmet>
        <title>Wal Wal | Projects</title>
        <meta name='description' content='Your neighbourhood freelance developer. Take a look at my projects!'/>
        <style>{'body {background: var(--white); color: var(--black)'}</style>
      </Helmet>
      <div id={styles.container}>
        <ProjectButton label='Portfolio' link='' color='var(--primaryColor)' />
        <ProjectButton label='Saving Cindi' link='' color='linear-gradient(to right, var(--SCPrimary), var(--SCAccent))'/>
        <ProjectButton label='Grade Aid' link='' color='var(--GAPrimary'/>
      </div>
    </Pane>
  );
};

export default Portfolio;