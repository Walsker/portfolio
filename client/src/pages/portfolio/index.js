import React, {useState} from 'react';
import {Helmet} from 'react-helmet';
import {animated, useTrail} from 'react-spring';
import {Pane, Stripe} from 'components';
import styles from './index.module.css';


const ProjectButton = ({style, label, link, color}) => {
  const [isHovering, toggleHover] = useState(false);

  return (
    <div className={styles.project} onMouseEnter={() => toggleHover(true)} onMouseLeave={() => toggleHover(false)}>
      <Stripe className={styles.projectStripe} isActive={isHovering} style={{backgroundColor: color}}/>
      <animated.h1 style={style}>{label}</animated.h1>
    </div>
  );
};

const Portfolio = () => {
  const fadeOut = useTrail(4, {
    to: {color: '#FAFAFA'},
    from: {color: '#F0F0F0'},
    delay: 750
  });

  return (
    <Pane>
      <Helmet>
        <title>Wal Wal | Projects</title>
        <meta name='description' content='Your neighbourhood freelance developer. Take a look at my projects!'/>
        <style>{'body {background: var(--white); color: var(--black)'}</style>
      </Helmet>
      <div id={styles.container}>
        <ProjectButton style={fadeOut[0]} label='Portfolio' link='' color='var(--primaryColor)'/>
        <ProjectButton style={fadeOut[1]} label='cuHacking' link='' color='#000000'/>
        <ProjectButton style={fadeOut[2]} label='Saving Cindi' link='' color='var(--scPrimary)'/>
        <ProjectButton style={fadeOut[3]} label='Grade Aid' link='' color='var(--gaPrimary)'/>
      </div>
    </Pane>
  );
};

export default Portfolio;