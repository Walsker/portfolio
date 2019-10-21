import React, {useEffect, useRef, useState} from 'react';
import {Helmet} from 'react-helmet';
import {HashLink as Link} from 'react-router-hash-link';
import {useInView} from 'react-intersection-observer';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faLinkedin,
  faGithub
} from '@fortawesome/free-brands-svg-icons';
import {faChevronDown, faEnvelope} from '@fortawesome/free-solid-svg-icons';
import {useChain, useSpring, animated} from 'react-spring';
import {Carousel, Pane, Stripe, Underline} from 'components';
import {useFadeIn, useInterval} from 'hooks';
import {JavascriptLogo, KandyLogo, NodeLogo, RavensLogo, ReactLogo} from 'assets';
import styles from './index.module.css';

const Landing = () => {
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
      <Stripe className={styles.landingStripe} stripeRef={stripeRef} isActive={inView} width={window.screen.width}/>
      {scrollIndicator}
      <div id={styles.landingLeft} className='unselectable'>
        <animated.div style={contentTrail[0]}>
          <h3 style={{marginBottom: 0}}>I create</h3>
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
      </div>
    </Pane>
  );
};

const About = () => {
  // A hook for knowing if an element attached with paneRef is on the screen
  const [ref, inView] = useInView({threshold: 0.35, triggerOnce: true});

  // Ref for the stripe
  const stripeRef = useRef();

  const Adjective = () => {
    // Words to use in the carousel
    const adjectives = [
      'Wal Wal',
      'Wal Wal',
      'Wal Wal',
      'Wal Wal',
      'passionate',
      'smart',
      'a bass vocalist',
      'creative',
      'hard-working',
      'a Leo',
      'friendly',
      'motivated'
    ];
    
    const componentify = (word) => <h4>I am <span style={{color: inView ? 'var(--primaryColor)' : 'var(--black)', transition: '0.75s', whiteSpace: 'nowrap'}}>{word}</span>.</h4>;
    const [index, select] = useState(0);
    useInterval(() => select((index+1) % adjectives.length), 500);

    return componentify(adjectives[index]);
  };

  // Animation config for the text
  const contentRef = useRef();
  const contentTrail = useFadeIn(4, contentRef, inView);
  const highlightRefs = [];
  
  // Chain together the animations
  useChain(inView ? [stripeRef, contentRef] : [contentRef, stripeRef], [0, 0.35]);
  
  // A HOC for highlighting text
  const Highlight = ({children}) => {
    const underlineRef = useRef();
    highlightRefs.push(underlineRef);

    return (
      <span style={{color: 'var(--primaryColor)', whiteSpace: 'nowrap', fontWeight: '900'}}>{children}</span>
    );
  };

  useChain(inView ? highlightRefs : []);

  return (
    <Pane inViewRef={ref}>
      <Stripe className={styles.aboutStripe} stripeRef={stripeRef} isActive={inView}/>
      <animated.div id={styles.aboutTop} style={contentTrail[0]}>
        <Adjective/>
        <div id={styles.aboutBio}>
          <div className={styles.bioSection}>
            Yes, my first name is the same as my last. Based in <Highlight>Ottawa, Canada</Highlight>, 
            I'm an up-and-coming freelance <Highlight>full stack developer</Highlight> who is ready to begin working 
            with those who want to seriously up their game - especially with <Highlight>local artists or businesses</Highlight>.
          </div>
          <div className={styles.bioSection}>
            My goal is <Highlight>success</Highlight> and my passion is empowering those around me. Although 
            I am also an extremely productive individual, I thrive in <Highlight>collaborative environments</Highlight>.{' '}
            <Underline.Hover>
              <Link smooth to='/#contact' style={{color: 'var(--black)'}}>Tell me about yourself</Link>
            </Underline.Hover>
            {/* <span style={{textDecoration: 'underline', cursor: 'pointer'}} onClick={() => window.scrollTo({top: document.body.scrollHeight, left: 0, behavior: 'smooth'})}>Tell me about yourself</span> */}
            , and perhaps we can create something amazing together!
          </div>
        </div>
      </animated.div>
      <animated.div id={styles.aboutBottom} style={contentTrail[3]}>
        <div id={styles.logoPair}>
          <RavensLogo className={styles.logo}/>
          <KandyLogo className={styles.logo}/>
        </div>
        <p>Currently studying Computer Science with a minor in Music Theory at Carleton University, and working an internship at Ribbon Communications on the Kandy Platform.</p>
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
        <Stripe className={styles.stripeFE} stripeRef={stripeRefFE} isActive={inView} width={window.screen.width}/>
        <Stripe className={styles.stripeBE} stripeRef={stripeRefBE} isActive={inView} width={window.screen.width}/>
        <Stripe className={styles.stripeMD} stripeRef={stripeRefMD} isActive={inView} width={window.screen.width}/>
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
          Using React Native I can create mobile apps for both Android and iOS quickly and effectively.
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
    <Pane inViewRef={ref} id='contact'>
      <div id={styles.contactContainer}>
        <div className={styles.contactSection}>
          <h5>Already have an idea in mind? Let’s not wait.</h5>
          <animated.h2 style={fadeIn}>
            <Underline.Hover color='var(--white)'>
              <a className={styles.link} href="mailto:wal@walcreates.ca" target="_top">wal@walcreates.ca</a>
            </Underline.Hover>
          </animated.h2>
        </div>
        <div className={styles.contactSection}>
          <div className={styles.contactSubsection}>
            <Icon icon={faLinkedin} link='https://www.linkedin.com/in/wal-wal'/>
            <Icon icon={faGithub} link='https://github.com/Walsker'/>
            <Icon icon={faEnvelope} link='mailto:wal@walcreates.ca'/>
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
  <div id={styles.home}>
    <Helmet>
      <title>Wal Wal</title>
    </Helmet>
    <Landing/>
    <About/>
    <Skills/>
    <Contact/>
  </div>
);

export default Home;