import React, {useRef, useState} from 'react';
import ReactDOM from 'react-dom';
import {useInView} from 'react-intersection-observer';
import {useChain, useSpring, useTrail, animated} from 'react-spring';
import {Carousel, Pane, Stripe} from './components';
import {useFadeIn, useInterval} from './hooks';
import {JavascriptLogo, KandyLogo, NodeLogo, RavensLogo, ReactLogo} from './assets';
import './index.css';

const PRIMARY_COLOUR = '#E23849';
const ACCENT_COLOUR = '#F9DC5C';

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
        <h5>Let me make one for you.</h5>
      </div>
    </>
  );
  
  // A hook for knowing if an element attached with paneRef is on the screen
  const [paneRef, inView] = useInView({threshold: 0.5, triggerOnce: true});
  
  // Ref for the stripe
  const stripeRef = useRef();

  // Animation config for the content
  const contentRef = useRef();
  const contentTrail = useFadeIn(content.props.children.length+1, contentRef, inView);
  const demoSegment = contentTrail.pop(); // Get the demo's animation config

  // Chain together the animations
  useChain(inView ? [stripeRef, contentRef] : [contentRef, stripeRef], [0, .3]);

  return (
    <Pane inViewRef={paneRef} style={{flexDirection: 'row'}}>
      <Stripe stripeRef={stripeRef} inView={inView} top='308px' size='200px' colour={PRIMARY_COLOUR}/>
      <div id='landing_left'>
        <div id='landing_left-wrapper'>
          {contentTrail.map((animStyle, index) => (
            <animated.div
              key={index}
              style={animStyle}
            >
              {content.props.children[index]}
            </animated.div>
          ))}
        </div>
      </div>
      <div id='landing_right'>
        <animated.div id='landing_right-wrapper' style={demoSegment}>
          <Carousel index={carouselIndex}>
            <svg width='30vw' height='20vw' style={{boxShadow: '1px 2px 25px 1px rgba(0, 0, 0, 0.2)'}}>
              <rect x='0' y='0' rx='20' ry='20' width='100%' height='100%' fill='#cfcfcf'></rect>
            </svg>
            <svg width='20vw' height='30vw' style={{boxShadow: '1px 2px 25px 1px rgba(0, 0, 0, 0.2)'}}>
              <rect x='0' y='0' rx='20' ry='20' width='100%' height='100%' fill='#cfcfcf'></rect>
            </svg>
          </Carousel>
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

  // Animation config for the text
  const contentRef = useRef();
  const [top, bottom] = useFadeIn(2, contentRef, inView);

  // Animation config for the logos
  const flipRef = useRef();
  const flipTrail = useTrail(5, {
    ref: flipRef,
    position: 'absolute',
    from: {opacity: 0, transform: 'rotateX(180deg)'},
    opacity: inView ? 1 : 0,
    transform: `rotateX(${inView ? 0 : 180}deg)`
  });

  // Chain together the animations
  useChain(inView ? [stripeRef, contentRef, flipRef] : [flipRef, contentRef, stripeRef], [0, 0.3, .8]);

  return (
    <Pane inViewRef={ref}>
      <Stripe stripeRef={stripeRef} inView={inView} top='165px' size='100px' colour={ACCENT_COLOUR}/>
      <animated.div id='about_top' style={top}>
        <div className='description'>
          <JavascriptLogo style={flipTrail[0]}/>
          <h4>Front End Development</h4>
          Where design meets development. I’ll create an amazing website that can dazzle everyone.
        </div>
        <div className='description'>
          <NodeLogo style={flipTrail[1]}/>
          <h4>Back End Development</h4>
          This is where my problem solving shines. I’ll augment your website to take on whatever tasks it needs.
        </div>
        <div className='description'>
          <ReactLogo style={flipTrail[2]}/>
          <h4>Mobile Development</h4>
          Using React Native I can create mobile apps for both Android and iOS with quickly and effectively.
        </div>
      </animated.div>
      <animated.div id='about_bottom' style={bottom}>
        <div id='logo-pair'>
          <RavensLogo style={flipTrail[3]}/>
          <KandyLogo style={flipTrail[4]}/>
        </div>
        <p>Currently studying Computer Science with a minor in Music Theory at Carleton University, and working an internship at Ribbon Communications on the Kandy project.</p>
      </animated.div>
    </Pane>
  );
};

const GradeAid = () => {
  // A hook for knowing if an element attached with paneRef is on the screen
  const [ref, inView] = useInView({threshold: 0.35, triggerOnce: true});

  // Animation config for the project
  const contentRef = useRef();
  const [fadeIn] = useFadeIn(1, contentRef, inView);

  // Ref for the stripe
  const stripeRef = useRef();

  // Chain together the animations
  useChain(inView ? [stripeRef, contentRef] : [contentRef, stripeRef], [0, .75]);

  return (
    <Pane inViewRef={ref}>
      <Stripe stripeRef={stripeRef} inView={inView} top='5vh' size='90vh' colour='#5921D8' style={{maxHeight: '720px', minHeight: '675px'}}/>
      <animated.div id='gradeAid_container' style={fadeIn}>
        <div id='ga_left'>
          <svg width='22vw' height='40vw' style={{boxShadow: '1px 2px 25px 1px rgba(0, 0, 0, 0.2)'}}>
            <rect x='0' y='0' rx='20' ry='20' width='100%' height='100%' fill='#cfcfcf'></rect>
          </svg>
        </div>
        <div id='ga_right'>
          <h2 id='ga_logo'>Grade<br/>Aid</h2>
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

// const Contact = () => {
//   // A hook for knowing if an element attached with paneRef is on the screen
//   const [ref, inView] = useInView({threshold: 0.35, triggerOnce: true});

//   return (
//     <Pane inViewRef={ref}>

//     </Pane>
//   );  
// };

const App = () => {
  return (
    <>
      <Landing/>
      <About/>
      <GradeAid/>
      {/* <Contact/> */}
    </>
  );
};

ReactDOM.render(<App/>, document.getElementById('root'));
