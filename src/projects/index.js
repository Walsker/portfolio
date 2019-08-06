import React, {useRef} from 'react';
import {useInView} from 'react-intersection-observer';
import {animated, config, interpolate, useChain, useSpring} from 'react-spring';
import {Pane} from 'components';
import {useFadeIn} from 'hooks';
import styles from './index.module.css';

const Project = ({title, link, ...props}) => {
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
        <div className={styles.demoWrapper}>
          <animated.div
            className={styles.demo}
            style={{
              clipPath: interpolate([a, b], (a, b) => 
                `polygon(100% ${b}, 100% 100%, ${b} 100%, 0 ${a}, 0 0, ${a} 0)`
              ),
            }}
          >
            {props.children}
          </animated.div>
        </div>
        <animated.div id={styles.title} style={titleFade}>
          <h1>{title}</h1>
          {link}
        </animated.div>
      </div>
    </Pane>
  );
};

const Projects = () => {
  return (
    <div id={styles.container}>
      <Project title='Portfolio' link='https://walcreates.ca'>
        <div style={{width: '90vw', height: '60vh', backgroundColor: 'var(--primaryColor)'}}/>
      </Project>
      <Project title='Grade Aid' link='https://gradeaid.walcreates.ca'>
        <div style={{width: '90vw', height: '60vh', backgroundColor: 'var(--gaColor)'}}/>
      </Project>
    </div>
  );
};

export default Projects;