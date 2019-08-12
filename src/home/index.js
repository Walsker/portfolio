import React, {useEffect, useRef, useState} from 'react';
import {useInView} from 'react-intersection-observer';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faLinkedin,
  faTwitter,
  faGithub
} from '@fortawesome/free-brands-svg-icons';
import {faChevronDown} from '@fortawesome/free-solid-svg-icons';
import {useChain, useSpring, animated} from 'react-spring';
import {Carousel, Pane, Stripe} from 'components';
import {useFadeIn, useInterval} from 'hooks';
import {JavascriptLogo, KandyLogo, NodeLogo, RavensLogo, ReactLogo, WalLogo} from 'assets';
import styles from './index.module.css';

const Landing = (props) => {
  // Hooks for the scrolling indicator
  const [atTop, setAtTop] = useState(window.pageYOffset <= 0);
  const handleScroll = () => setAtTop(window.pageYOffset <= 50);
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  const scrollIndicator = !atTop ? <div/> : (
    <div id={styles.scrollIndicator} className='unselectable'>
      scroll<br/>
      <FontAwesomeIcon icon={faChevronDown} size='2x'/>
    </div>
  );

  // State for moving the carousel
  const [carouselIndex, selectWindow] = useState(0);
  useInterval(() => selectWindow((carouselIndex+1) % 2), 5000);

  // A hook for knowing if an element attached with paneRef is on the screen
  const [paneRef, inView] = useInView({threshold: 0.5, triggerOnce: true});

  // Ref for the stripe
  const stripeRef = useRef();

  // Animation config for the content
  const contentRef = useRef();
  const contentTrail = useFadeIn(4, contentRef, inView);

  // Chain together the animations
  useChain(inView ? [stripeRef, contentRef] : [contentRef, stripeRef], [.3, .6]);

  return (
    <Pane inViewRef={paneRef} style={{flexDirection: 'row'}}>
      <Stripe className={styles.landingStripe} stripeRef={stripeRef} inView={inView}/>
      {scrollIndicator}
      <div id={styles.landingLeft} className='unselectable'>
        <animated.div style={contentTrail[0]}>
          <h3>I create</h3>
        </animated.div>
        <animated.div style={contentTrail[1]}>
          <Carousel index={carouselIndex}>
            <h1>websites</h1>
            <h1>mobile apps</h1>
          </Carousel>
        </animated.div>
      </div>
      <div id={styles.landingRight}>
        <animated.div id={styles.keepMovingForward} style={contentTrail[2]}>
          keep moving forward
        </animated.div>
        <animated.div id={styles.values} style={contentTrail[2]}>
          <div className={styles.valueBox}>
            <span style={{fontWeight: 'bold'}}>my passion</span>
            <br/>improvement
          </div>
          <div className={styles.valueBox}>
            <span style={{fontWeight: 'bold'}}>the key</span>
            <br/>collaboration
          </div>
          <div className={styles.valueBox}>
            <span style={{fontWeight: 'bold'}}>my goal</span>
            <br/>success
          </div>
        </animated.div>
        <animated.div id={styles.shortcuts} style={contentTrail[3]}>
          <div className={styles.landingButton} onClick={() => window.scrollTo({top: document.body.scrollHeight, left: 0, behavior: 'smooth'})}>contact</div>
        </animated.div>
      </div>
    </Pane>
  );
};

const About = (props) => {
  // A hook for knowing if an element attached with paneRef is on the screen
  const [ref, inView] = useInView({threshold: 0.35, triggerOnce: true});

  // Ref for the stripe
  const stripeRef = useRef();

  // Words to use in the carousel
  const adjectives = [
    'Wal Wal',
    'Wal Wal',
    'Wal Wal',
    'Wal Wal',
    'amazing',
    'passionate',
    'smart',
    'a bass singer',
    'creative',
    'hard-working',
    'a Leo',
    'friendly',
    'a deep sleeper',
    'motivated'
  ];
  const highlightStyle = {color: inView ? 'var(--primaryColor)' : 'var(--black)', transition: '0.75s'};
  const componentify = (word) => <h4>I am <span style={highlightStyle}>{word}.</span></h4>;

  const [index, select] = useState(0);
  useInterval(() => select((index+1) % adjectives.length), 500);

  // Animation config for the text
  const contentRef = useRef();
  const contentTrail = useFadeIn(4, contentRef, inView);

  // Chain together the animations
  useChain(inView ? [stripeRef, contentRef] : [contentRef, stripeRef], [0, 0.35]);

  // A method for highlighting text
  const highlight = text => <span style={highlightStyle}>{text}</span>;

  return (
    <Pane inViewRef={ref}>
      <div id={styles.aboutTop}>
        <Stripe className={styles.aboutStripe} stripeRef={stripeRef} inView={inView}/>
        {componentify(adjectives[index])}
        <div id={styles.aboutBio}>
          <div className={styles.bioSection}>
            Yes, my first name is the same as my last. Based in {highlight('Ottawa, Canada')}, I'm an up-and-coming freelance {highlight('software developer')} who is ready to begin working 
            with those who want to seriously up their game; especially with {highlight('local artists or businesses')}.
          </div>
          <div className={styles.bioSection}>
            My goal is {highlight('success')} and my passion is empowering those around me. Although 
            I am also an extremely productive individual, I thrive in {highlight('collaborative environments')}.{' '}
            <span style={{textDecoration: 'underline', cursor: 'pointer'}} onClick={() => window.scrollTo({top: document.body.scrollHeight, left: 0, behavior: 'smooth'})}>Tell me about yourself</span>
            , and perhaps we can create something amazing together!
          </div>
        </div>
      </div>
      <animated.div id={styles.aboutBottom} style={contentTrail[3]}>
        <div id={styles.logoPair}>
          <RavensLogo className={styles.logo}/>
          <KandyLogo className={styles.logo}/>
        </div>
        <p>Currently studying Computer Science with a minor in Music Theory at Carleton University, and working an internship at Ribbon Communications on the Kandy project.</p>
      </animated.div>
    </Pane>
  );
};

const Skills = () => {
  // A hook for knowing if an element attached with paneRef is on the screen
  const [ref, inView] = useInView({threshold: 0.35, triggerOnce: true});

  // Ref for the stripe
  const stripeRefFE = useRef();
  const stripeRefBE = useRef();
  const stripeRefMD = useRef();

  // Animation config for the text
  const contentRef = useRef();
  const contentTrail = useFadeIn(3, contentRef, inView);

  // Chain together the animations
  useChain(inView ? [stripeRefFE, stripeRefBE, stripeRefMD, contentRef] : [contentRef, stripeRefMD, stripeRefBE, stripeRefFE], [0, 0.1, 0.2, 0.4]);

  return (
    <Pane inViewRef={ref} style={{minHeight: 'unset', maxHeight: 'unset', height: 'unset'}}>
      <div id={styles.skills}>
        <Stripe className={styles.stripeFE} stripeRef={stripeRefFE} inView={inView}/>
        <Stripe className={styles.stripeBE} stripeRef={stripeRefBE} inView={inView}/>
        <Stripe className={styles.stripeMD} stripeRef={stripeRefMD} inView={inView}/>
        <animated.div className={styles.skillBox} style={contentTrail[0]}>
          <JavascriptLogo className={styles.logo}/>
          <h4>Front End<br/>Development</h4>
          Where design meets development. I’ll create an amazing website that can dazzle everyone.
        </animated.div>
        <animated.div className={styles.skillBox} style={contentTrail[1]}>
          <NodeLogo className={styles.logo}/>
          <h4>Back End<br/>Development</h4>
          This is where my problem solving shines. I’ll augment your website to take on whatever tasks it needs.
        </animated.div>
        <animated.div className={styles.skillBox} style={contentTrail[2]}>
          <ReactLogo className={styles.logo}/>
          <h4>Mobile<br/>Development</h4>
          Using React Native I can create mobile apps for both Android and iOS with quickly and effectively.
        </animated.div>
      </div>
    </Pane>
  );
};

const Icon = ({icon, link}) => (
  <a className={`${styles.link} ${styles.icon}`} target='_blank' rel='noopener noreferrer external' href={link}>
    <FontAwesomeIcon icon={icon} size='2x'/>
  </a>
);

const Contact = () => {
  // A hook for knowing if an element attached with paneRef is on the screen
  const [ref, inView] = useInView({threshold: 0.35, triggerOnce: true});

  // Animation config for the email
  const fadeIn = useSpring({
    delay: 1000,
    from: {opacity: 0, transform: 'translateY(50px)'},
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(25px)'
  });

  return (
    <Pane inViewRef={ref}>
      <div id={styles.contactContainer}>
        <div className={styles.contactSection}>
          <h5>Already have an idea in mind? Let’s not wait.</h5>
          <animated.h2 style={fadeIn}>
            <a className={styles.link} href="mailto:me@walcreates.ca" target="_top">me@walcreates.ca</a>
          </animated.h2>
        </div>
        <div className={styles.contactSection}>
          <WalLogo className={`${styles.contactSubsection} ${styles.logo} ${styles.myLogo} unselectable`}/>
          <div className={styles.contactSubsection}>
            <Icon icon={faLinkedin} link='https://www.linkedin.com/in/wal-wal'/>
            <Icon icon={faGithub} link='https://github.com/Walsker'/>
            <Icon icon={faTwitter} link='https://twitter.com'/>
          </div>
          <div className={styles.contactSubsection}>
            Created with <span role='img' aria-label='<3'>❤️</span> by <span style={{color: 'var(--primaryColor)'}}>Wal Wal</span>
          </div>
          <div className={styles.contactSubsection}>
            Copyright 2019 © Wal Wal. All rights reserved.
          </div>
        </div>
      </div>
    </Pane>
  );  
};

const Home = () => (
  <>
    <Landing/>
    <About/>
    <Skills/>
    <Contact/>
  </>
);

export default Home;