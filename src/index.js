import React, {useCallback, useEffect, useRef, useState} from 'react';
import ReactDOM from 'react-dom';
import {useInView} from 'react-intersection-observer';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronDown} from '@fortawesome/free-solid-svg-icons';
import {useChain, useSpring, animated} from 'react-spring';
import {Carousel, Navbar, Pane, SocialIcon, Stripe} from './components';
import {useFadeIn, useInterval} from './hooks';
import {JavascriptLogo, KandyLogo, NodeLogo, RavensLogo, ReactLogo} from './assets';
import './index.css';

const Landing = (props) => {
  // Hooks for the scrolling indicator
  const [atTop, setAtTop] = useState(window.pageYOffset <= 0);
  const handleScroll = useCallback(() => setAtTop(window.pageYOffset <= 50));
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  const scrollIndicator = !atTop ? <div/> : (
    <div id='scroll_indicator' className='unselectable'>
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
  useChain(inView ? [stripeRef, contentRef] : [contentRef, stripeRef], [0, .3]);

  return (
    <Pane inViewRef={paneRef} style={{flexDirection: 'row'}}>
      <Stripe stripeRef={stripeRef} inView={inView} top='235px' size='140px' colour='var(--primaryColor)'/>
      {scrollIndicator}
      <div id='landing_left' className='unselectable'>
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
      <div id='landing_right'>
        <animated.div id='keep_moving_forward' style={contentTrail[3]}>
          keep moving forward
        </animated.div>
        <animated.div id='values' style={contentTrail[3]}>
          <div className='value_box'>
            <span style={{fontWeight: 'bold'}}>my passion</span>
            <br/>improvement
          </div>
          <div className='value_box'>
            <span style={{fontWeight: 'bold'}}>the key</span>
            <br/>collaboration
          </div>
          <div className='value_box'>
            <span style={{fontWeight: 'bold'}}>my goal</span>
            <br/>success
          </div>
        </animated.div>
        <animated.div id='shortcuts' style={contentTrail[2]}>
          <div className='landing_button'>projects</div>
          <div className='landing_button'>resume</div>
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
    'amazing',
    'smart',
    'a Leo',
    'kind',
    'creative',
    'black',
    'charming',
    'hard-working',
    'a perfectionist',
    'friendly'

  ];
  const componentify = (word) => <h4>I am <span style={{color: 'var(--primaryColor)', fontWeight: 'bold'}}>{word}.</span></h4>;

  const [index, select] = useState(0);
  useInterval(() => select((index+1) % adjectives.length), 500);

  // Animation config for the text
  const contentRef = useRef();
  const contentTrail = useFadeIn(4, contentRef, inView);

  // Chain together the animations
  useChain(inView ? [stripeRef, contentRef] : [contentRef, stripeRef], [0, 0.35]);

  return (
    <Pane inViewRef={ref}>
      <div id='about_top'>
        <Stripe stripeRef={stripeRef} inView={inView} size='300px' colour='var(--white)'/>
        {componentify(adjectives[index])}
        <div id='row_section'>
          <div className='row_box'>
            Yes, my first name is the same as my last. Here's some filler text. Where design meets development. I’ll create an amazing website that can dazzle everyone.
            More words will be here that will make me sound even cooler to the reader
          </div>
          <div className='row_box'>
            My goal is success and I exist to empower those around me. Where design meets development. I’ll create an amazing website that can dazzle everyone.
            Some more filler text, I'll decide what goes in here later. A line to remember me by.
          </div>
        </div>
      </div>
      <animated.div id='about_bottom' style={contentTrail[3]}>
        <div id='logo-pair'>
          <RavensLogo className='logo'/>
          <KandyLogo className='logo'/>
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
  const stripeRef = useRef();

  // Animation config for the text
  const contentRef = useRef();
  const contentTrail = useFadeIn(3, contentRef, inView);

  // Chain together the animations
  useChain(inView ? [stripeRef, contentRef] : [contentRef, stripeRef], [0, 0.35]);

  return (
    <Pane inViewRef={ref} style={{minHeight: 'unset', height: 'unset'}}>
      <div id='skills'>
        <Stripe stripeRef={stripeRef} inView={inView} size='100px' colour='var(--primaryColor)' style={{marginTop: '80px'}}/>
        <animated.div className='row_box' style={contentTrail[0]}>
          <JavascriptLogo className='logo'/>
          <h4>Front End Development</h4>
          Where design meets development. I’ll create an amazing website that can dazzle everyone.
        </animated.div>
        <animated.div className='row_box' style={contentTrail[1]}>
          <NodeLogo className='logo'/>
          <h4>Back End Development</h4>
          This is where my problem solving shines. I’ll augment your website to take on whatever tasks it needs.
        </animated.div>
        <animated.div className='row_box' style={contentTrail[2]}>
          <ReactLogo className='logo'/>
          <h4>Mobile Development</h4>
          Using React Native I can create mobile apps for both Android and iOS with quickly and effectively.
        </animated.div>
      </div>
    </Pane>
  );
};

const GradeAid = ({id}) => {
  // A hook for knowing if an element attached with paneRef is on the screen
  const [ref, inView] = useInView({threshold: 0.35, triggerOnce: true});

  // Animation config for the project
  const contentRef = useRef();
  const [fadeIn] = useFadeIn(1, contentRef, inView);

  // Ref for the stripe
  const stripeRef = useRef();

  // Chain together the animations
  useChain(inView ? [stripeRef, contentRef] : [contentRef, stripeRef], [0, .5]);

  return (
    <Pane inViewRef={ref} id={id}>
      <Stripe stripeRef={stripeRef} inView={inView} top='5%' size='90%' colour='var(--gaTheme)'/>
      <animated.div id='ga_container' style={fadeIn}>
        <div id='ga_left'>
          <div style={{width: '22vw', height: '100%', boxShadow: '1px 2px 25px 1px rgba(0, 0, 0, 0.2)', borderRadius: 20, backgroundColor: '#CFCFCF'}}/>
        </div>
        <div id='ga_right'>
          <h2>Grade<br/>Aid</h2>
          <div className='ga_section'>
            <div style={{width: 150, height: 50, backgroundColor: 'black', borderRadius: 10}}/>
            <div style={{width: 150, height: 50, backgroundColor: 'black', borderRadius: 10, margin: '0 20px'}}/>
          </div>
          <div className='ga_section'>
            Organize your assignments and take control of your grades.
          </div>
          {/* <div className='ga_section'>
            <span className='bold'>GitHub</span>
          </div> */}
        </div>
      </animated.div>
    </Pane>
  );
};

const Contact = ({id}) => {
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
    <Pane inViewRef={ref} id={id}>
      <div id='contact_container'>
        <div className='contact_section'>
          <h3>Already have an idea in mind? Let’s not wait.</h3>
          <animated.h2 style={fadeIn}>
            <a href="mailto:me@walcreates.ca" target="_top">me@walcreates.ca</a>
          </animated.h2>
        </div>
        <div className='contact_section'>
          <div className='contact_subSection' style={{width: 50, height: 50, backgroundColor: '#CFCFCF', borderRadius: 5}}/>
          <div className='contact_subSection'>
            <SocialIcon type='LinkedIn' link='https://www.linkedin.com/in/wal-wal'/>
            <SocialIcon type='GitHub' link='https://github.com/Walsker'/>
            <SocialIcon type='Twitter' link='https://twitter.com'/>
          </div>
          <div className='contact_subSection'>
            Made with <span role='img' aria-label='<3'>💛</span> in <span style={{color: 'var(--accentColor)'}}>Ottawa</span>
          </div>
          <div className='contact_subSection'>
            Copyright 2019 © Wal Wal. All rights reserved.
          </div>
        </div>
      </div>
    </Pane>
  );  
};

const App = () => (
  <>
    <Navbar/>
    <Landing/>
    <About/>
    <Skills/>
    {/* <GradeAid id='Projects'/> */}
    {/* <Contact id='Contact'/> */}
  </>
);

ReactDOM.render(<App/>, document.getElementById('root'));
