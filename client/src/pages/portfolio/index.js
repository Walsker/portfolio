import React, {useEffect, useState} from 'react';
import {Helmet} from 'react-helmet';
import {Link, Route, useLocation} from 'react-router-dom';
import {Transition} from 'react-transition-group';
import {animated, useTrail} from 'react-spring';
import {Pane, Stripe} from 'components';
import {useMobile} from 'hooks';
import styles from './index.module.css';

import Portfolio from './portfolio';
import CuHacking from './cuHacking';
import SavingCindi from './savingCindi';

const ProjectButton = ({style, label, link, color}) => {
  const isMobile = useMobile();
  const {pathname} = useLocation();
  const [isHovering, toggleHover] = useState(false);
  const [isFrozen, freeze] = useState(false);

  useEffect(() => {
    if (pathname === '/portfolio' && isFrozen) {
      let unfreeze = setTimeout(() => freeze(false), 500);
      return () => clearTimeout(unfreeze);
    }
  }, [pathname, isFrozen]);

  if (isMobile) style.color = color;

  return (
    <Link
      to={{
        pathname: `/portfolio${link}`,
        state: {
          animate: true
        }
      }}
      className={styles.projectLink}
      onClick={() => freeze(true)}
      onMouseEnter={() => toggleHover(true)}
      onMouseLeave={() => toggleHover(false)}
    >
      <Stripe className={styles.projectStripe} isActive={(isHovering || (pathname === `/portfolio${link}`) || isFrozen) && !isMobile} style={{backgroundColor: color}}/>
      <animated.h1 style={style}>{label}</animated.h1>
    </Link>
  );
};

const PortfolioPage = () => {
  const fadeOut = useTrail(4, {
    to: {color: '#FAFAFA'},
    from: {color: '#F0F0F0'},
    delay: 750
  });

  const routes = [
    {path: '/portfolio', name: 'Portfolio', color: 'var(--primaryColor)', Component: Portfolio},
    {path: '/cuhacking', name: 'cuHacking', color: 'black', Component: CuHacking},
    {path: '/savingcindi', name: 'Saving Cindi', color: 'var(--scPrimary)', Component: SavingCindi},
    {path: '/gradeaid', name: 'Grade Aid', color: 'var(--gaPrimary)', Component: CuHacking},
  ];

  return (
    <Pane>
      <Helmet>
        <title>Wal Wal | Portfolio</title>
        <meta name='description' content='Your neighbourhood freelance developer. Take a look at my projects!'/>
        <style>{'body {background: var(--white); color: var(--black)'}</style>
      </Helmet>
      <div id={styles.container}>
        {routes.map(({name, path, color}, i) => <ProjectButton key={i} style={fadeOut[i]} label={name} link={path} color={color}/>)}
      </div>
      {routes.map(({path, color, Component}) => (
        <Route key={path} exact path={`/portfolio${path}`}>
          {({match, location}) => (
            <Transition
              in={match != null}
              timeout={{
                enter: 500,
                exit: 500
              }}
              unmountOnExit
            >
              {state => <Component color={color} animate={location.state ? location.state.animate : false} transitionState={state}/>}
            </Transition>
          )}
        </Route>
      ))}
    </Pane>
  );
};

export default PortfolioPage;