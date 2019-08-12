import React, {useRef} from 'react';
import {useInView} from 'react-intersection-observer';
import {animated, config, interpolate, useChain, useSpring} from 'react-spring';
import {GradeAidLogo} from 'assets';
import {Pane} from 'components';
import {useFadeIn} from 'hooks';
import styles from './index.module.css';

const Project = ({title, subtitle, ...props}) => {
  // A hook for knowing if an element attached with paneRef is on the screen
  const [ref, inView] = useInView({threshold: 0.4, triggerOnce: true});

  // Animation config for the demo
  const demoRef = useRef();
  const {a, b} = useSpring({
    ref: demoRef,
    config: config.slow,
    from: {a: '0%', b: '100%'},
    a: inView ? '100%' : '0%',
    b: inView ? '0%' : '100%'
  });

  // Animation config for the title 
  const titleRef = useRef();
  const [titleFade] = useFadeIn(2, titleRef, inView);

  useChain(inView ? [demoRef, titleRef] : [titleRef, demoRef], [0.25, 1]);

  return (
    <Pane inViewRef={ref}>
      <div className={styles.project}>
        <div className={styles.demo}>
          <animated.div
            className={`${styles.demoWrapper} unselectable`}
            style={{
              clipPath: interpolate([a, b], (a, b) => 
                `polygon(100% ${b}, 100% 100%, ${b} 100%, 0 ${a}, 0 0, ${a} 0)`
              ),
            }}
          >
            {props.children}
          </animated.div>
        </div>
        <animated.div className={styles.title} style={titleFade}>
          <h1>{title}</h1>
          {subtitle}
        </animated.div>
      </div>
    </Pane>
  );
};

const Projects = () => {
  return (
    <div id={styles.container}>
      <Project title='Portfolio' subtitle="You're already here!">
        <a href='/'>
          <div className={styles.portfolioDemo}>
            wal<br/>creates<br/>.ca
          </div>
        </a>
      </Project>
      <Project title='Grade Aid' subtitle='Coming soon!'>
        <div className={`${styles.gaDemo} ${styles.deactivatedDemo}`}>
          <GradeAidLogo id={styles.gaLogo}/>
          Organize your assignments and take control of your grades.
        </div>
      </Project>
    </div>
  );
};

export default Projects;