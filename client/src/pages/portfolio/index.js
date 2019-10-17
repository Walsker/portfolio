import React, {useEffect, useState} from 'react';
import {Helmet} from 'react-helmet';
import {Link, Route, useLocation} from 'react-router-dom';
import {Transition} from 'react-transition-group';
import {animated, useTrail} from 'react-spring';
import {Pane, Stripe} from 'components';
import styles from './index.module.css';

import PortfolioProject from './portfolio';
import CuHacking from './cuHacking';

const ProjectButton = ({style, label, link, color}) => {
  const {pathname} = useLocation();
  const [isHovering, toggleHover] = useState(false);
  const [isFrozen, freeze] = useState(false);

  useEffect(() => {
    if (pathname === '/portfolio' && isFrozen) {
      let unfreeze = setTimeout(() => freeze(false), 500);
      return () => clearTimeout(unfreeze);
    }
  }, [pathname, isFrozen]);

  return (
    <Link
      to={{
        pathname: `/portfolio${link}`,
        state: {
          freeze: true
        }
      }}
      className={styles.projectLink}
      onClick={() => freeze(true)}
      onMouseEnter={() => toggleHover(true)}
      onMouseLeave={() => toggleHover(false)}
    >
      <Stripe className={styles.projectStripe} isActive={isHovering || (pathname === `/portfolio${link}`) || isFrozen} style={{backgroundColor: color}}/>
      <animated.h1 style={style}>{label}</animated.h1>
    </Link>
  );
};

const Portfolio = () => {
  const fadeOut = useTrail(4, {
    to: {color: '#FAFAFA'},
    from: {color: '#F0F0F0'},
    delay: 750
  });

  const routes = [
    {subPath: '/portfolio', Component: PortfolioProject, color: 'var(--primaryColor)'},
    {subPath: '/cuhacking', Component: CuHacking, color: 'black'}
  ];

  return (
    <Pane>
      <Helmet>
        <title>Wal Wal | Portfolio</title>
        <meta name='description' content='Your neighbourhood freelance developer. Take a look at my projects!'/>
        <style>{'body {background: var(--white); color: var(--black)'}</style>
      </Helmet>
      <div id={styles.container}>
        <ProjectButton style={fadeOut[0]} label='Portfolio' link='/portfolio' color='var(--primaryColor)'/>
        <ProjectButton style={fadeOut[1]} label='cuHacking' link='/cuhacking' color='#000000'/>
        <ProjectButton style={fadeOut[2]} label='Saving Cindi' link='' color='var(--scPrimary)'/>
        <ProjectButton style={fadeOut[3]} label='Grade Aid' link='' color='var(--gaPrimary)'/>
      </div>
      {routes.map(({subPath, Component, color}) => (
        <Route key={subPath} exact path={`/portfolio${subPath}`}>
          {({match, history}) => (
            <Transition
              in={match != null}
              timeout={{
                enter: 0,
                exit: 1000
              }}
              unmountOnExit
            >
              {state => <Component animate={history.action === 'PUSH'} transitionState={state} color={color}/>}
            </Transition>
          )}
        </Route>
      ))}
    </Pane>
  );
};

export default Portfolio;