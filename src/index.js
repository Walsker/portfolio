import React, {useRef, useState} from 'react';
import ReactDOM from 'react-dom';
import {useInView} from 'react-intersection-observer';
import {useChain, useSpring, useTrail, animated} from 'react-spring';
import {Carousel, Pane} from './components';
import {useInterval} from './hooks';
import './index.css';

const PRIMARY_COLOUR = '#E23849';

const Landing = () => {
  // State for moving the carousel
  const [carouselIndex, selectWindow] = useState(0);
  useInterval(() => selectWindow(carouselIndex+1), 5000);

  const content = (
    <>
      <div className='introGroup'>
        <h3>Hey, I'm</h3>
        <h1>Wal Wal</h1>
      </div>
      <div className='introGroup'>
        <h3 className='inverted'>and I create</h3>
        <Carousel index={carouselIndex}>
          <h2>websites</h2>
          <h2>mobile apps</h2>
        </Carousel>
      </div>
      <div className='introGroup'>
        Let me make one for you.
      </div>
    </>
  );
  
  // A hook for knowing if an element attached with paneRef is on the screen
  const [paneRef, inView] = useInView({threshold: 0.5, triggerOnce: true});
  
  // Animation config for the stripe
  const stripeRef = useRef();
  const stripe = useSpring({
    ref: stripeRef,
    config: {clamp: true, friction: 22},
    from: {length: 0},
    to: {length: window.innerWidth}
  });

  // Animation config for the content
  const contentRef = useRef();
  const contentTrail = useTrail(content.props.children.length+1, { // +1 for the demo on the right
    ref: contentRef,
    from: {opacity: 0, transform: 'translate(0, 50px'},
    opacity: inView ? 1 : 0,
    transform: inView ? 'translate(0,0)' : 'translate(0,50px)',
  });
  const demoSegment = contentTrail.pop(); // Get the demo's animation config

  useChain(inView ? [stripeRef, contentRef] : [contentRef, stripeRef], [0, .3]);

  return (
    <Pane inViewRef={paneRef} style={{flexDirection: 'row'}}>
      <animated.svg width='100%' height='200px' style={{position: 'absolute', top: '308px', zIndex: -1}}>
        <animated.rect x='0' y='0' width={stripe.length} height='100%' fill={PRIMARY_COLOUR}></animated.rect>
      </animated.svg>
      <div id='landing_left'>
        <div id='landing_left-wrapper'>
          {contentTrail.map((animStyle, index) => {
            return (
              <animated.div
                key={index}
                style={animStyle}
              >
                {content.props.children[index]}
              </animated.div>
            );
          })}
        </div>
      </div>
      <div id='landing_right'>
        <animated.div id='landing_right-wrapper' style={demoSegment}>
          <Carousel index={carouselIndex}>
            <svg width='30vw' height='20vw'>
              <rect x='0' y='0' width='100%' height='100%' fill='#cfcfcf'></rect>
            </svg>
            <svg width='20vw' height='30vw'>
              <rect x='0' y='0' width='100%' height='100%' fill='#cfcfcf'></rect>
            </svg>
          </Carousel>
        </animated.div>
      </div>
    </Pane>
  );
};

const About = () => {
  const content = (
    <>
      <div className='section' style={{flexDirection: 'row'}}>
        
      </div>
      <div className='section'>
        
      </div>
    </>
  );

  const [ref, inView] = useInView({threshold: 0.35, triggerOnce: true});

  const [top, bottom] = useTrail(content.props.children.length, {
    from: {opacity: 0, transform: 'translate3d(0, 50px, 0'},
    opacity: inView ? 1 : 0,
    transform: inView ? 'translate3d(0,0,0)' : 'translate3d(0,25px,0)'
  });

  return (
    <Pane inViewRef={ref} style={{justifyContent: 'center'}}>
      <animated.div id='about_top' style={top}>
        <div className='description'>
          <h4>Front End Development</h4>
          Where design meets development. I’ll create an amazing website that can dazzle everyone.
        </div>
        <div className='description'>
          <h4>Back End Development</h4>
          This is where my problem solving shines. I’ll augment your website to take on whatever tasks it needs.
        </div>
        <div className='description'>
          <h4>Mobile Development</h4>
          Using React Native I can create mobile apps for both Android and iOS with quickly and effectively.
        </div>
      </animated.div>
      <animated.div id='about_bottom' style={bottom}>
        <p>Currently studying Computer Science with a minor in Music Theory at Carleton University, and working an internship at Ribbon Communications.</p>
      </animated.div>
    </Pane>
  );
};

const App = () => {
  return (
    <>
      {/* <Landing/> */}
      <About/>
      <About/>
      <About/>
    </>
  );
};

ReactDOM.render(<App/>, document.getElementById('root'));
