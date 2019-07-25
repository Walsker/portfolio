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
        <h4>Let me make one for you.</h4>
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
  const text = (
    <>
      <h1>Part 2</h1> 
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam diam quam, dictum sed laoreet dictum, laoreet eget nibh. Praesent porta tempor dui, quis eleifend orci efficitur ut. Ut in nisl hendrerit, consequat tellus consequat, cursus justo. Duis neque justo, convallis ut eleifend id, commodo non purus. Fusce auctor dui in libero volutpat, a auctor mi semper. Mauris auctor sed massa sed porta. Morbi malesuada justo quis quam tincidunt, vel mattis nisi scelerisque. Aenean pulvinar nibh elit. Donec non velit id justo convallis iaculis. Vivamus pretium est felis, sit amet faucibus nunc vulputate sit amet. Fusce neque urna, molestie vel aliquet in, fringilla a mi. Vivamus malesuada ligula tortor, eu molestie mauris placerat sed. Quisque sollicitudin a velit vitae rutrum. Proin nisl nisi, tincidunt quis ex sed, posuere vestibulum diam.
      </p>
      <p>
        Curabitur ac rhoncus odio. Donec volutpat massa ac posuere auctor. Curabitur rutrum at arcu ut tempor. Fusce dapibus odio eu consectetur sodales. Phasellus venenatis sed nibh in dapibus. Praesent congue sed est vel faucibus. In justo tortor, interdum sit amet arcu ac, ullamcorper viverra elit. Nulla facilisi. Morbi posuere auctor nisi sit amet ultricies. Sed iaculis mauris id nunc consequat venenatis. Integer auctor purus placerat augue aliquam, sed facilisis ex imperdiet.
      </p>
      <p>
        Curabitur ac rhoncus odio. Donec volutpat massa ac posuere auctor. Curabitur rutrum at arcu ut tempor. Fusce dapibus odio eu consectetur sodales. Phasellus venenatis sed nibh in dapibus. Praesent congue sed est vel faucibus. In justo tortor, interdum sit amet arcu ac, ullamcorper viverra elit. Nulla facilisi. Morbi posuere auctor nisi sit amet ultricies. Sed iaculis mauris id nunc consequat venenatis. Integer auctor purus placerat augue aliquam, sed facilisis ex imperdiet.
      </p>
      <p>
        Curabitur ac rhoncus odio. Donec volutpat massa ac posuere auctor. Curabitur rutrum at arcu ut tempor. Fusce dapibus odio eu consectetur sodales. Phasellus venenatis sed nibh in dapibus. Praesent congue sed est vel faucibus. In justo tortor, interdum sit amet arcu ac, ullamcorper viverra elit. Nulla facilisi. Morbi posuere auctor nisi sit amet ultricies. Sed iaculis mauris id nunc consequat venenatis. Integer auctor purus placerat augue aliquam, sed facilisis ex imperdiet.
      </p>
    </>
  );

  const [ref, inView] = useInView({threshold: 0.35, triggerOnce: true});

  const textTrail = useTrail(text.props.children.length, {
    from: {opacity: 0, transform: 'translate3d(0, 50px, 0'},
    opacity: inView ? 1 : 0,
    transform: inView ? 'translate3d(0,0,0)' : 'translate3d(0,25px,0)'
  });

  return (
    <Pane inViewRef={ref} style={{justifyContent: 'center'}}>
      {textTrail.map((animStyle, index) => {
        return (
          <animated.div
            key={index}
            style={animStyle}
          >
            {text.props.children[index]}
          </animated.div>
        );
      })}
    </Pane>
  );
};

const App = () => {
  return (
    <>
      <Landing/>
      <About/>
      <About/>
      <About/>
    </>
  );
};

ReactDOM.render(<App/>, document.getElementById('root'));
