import React, {useEffect, useRef, useState} from 'react';
import ReactDOM from 'react-dom';
import {useChain, useSpring, useTrail, useTransition, animated} from 'react-spring';
import {useInView} from 'react-intersection-observer';
import './index.css';

const PRIMARY_COLOUR = '#E23849';

// Basic pane component. Each pane is the size of the browser window
const Pane = ({children, inViewRef}) => (
  <div ref={inViewRef} className='pane'>
    {children}
  </div>
);

// const CarouselView = ({children, inViewRef}) => {
//   const [index, select] = useState(children.map(0));

//   const entryRef = useRef();
//   const entryAnim = useSpring({
//     ref: entryRef,
//     delay: 5000,
//     from: {opacity: 0, transform: 'translate(-50px, 0)'},
//     to: {opacity: 1, transform: 'translate(0, 0)'}
//   });

//   const exitRef = useRef();
//   const exitAnim = useSpring({
//     ref: entryRef,
//     delay: 5000,
//     from: {opacity: 1, transform: 'translate(0, 0)'},
//     to: {opacity: 0, transform: 'translate(50px, 0)'},
//     onRest: () => select(selected == children.length-1 ? 0 : selected+1)
//   });

//   const transitions = useTransition(children, null, {
//     from: {opacity: 0, transform: 'translate(-50px, 0)'},
//     enter: {opacity: 1, transform: 'translate(0, 0)'},
//     leave: {opacity: 0, transform: 'translate(50px, 0)'}
//   });

//   return transitions.map(({item, props, key}) => (
//     <animated.div key={key} style={props}>
//       {item}
//     </animated.div>
//   ));
// };

const Landing = () => {

  // State for the toggle between 'websites' and 'mobile apps'
  const [isMobile, toggleDemo] = useState((false));
  const [highlightText, toggleText] = useState('websites');

  const demo = useSpring({
    from: {text: '',}
  });


  const content = (
    <>
      <div className='introGroup'>
        <h3>Hey, I'm</h3>
        <h1>Wal Wal</h1>
      </div>
      <div className='introGroup'>
        <h3 className='inverted'>and I create</h3>
        <h2>websites</h2>
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
    from: {length: 0},
    to: {length: window.innerWidth}
  });

  // Animation config for the content
  const contentRef = useRef();
  const contentTrail = useTrail(content.props.children.length, {
    ref: contentRef,
    from: {opacity: 0, transform: 'translate(0, 50px'},
    opacity: inView ? 1 : 0,
    transform: inView ? 'translate(0,0)' : 'translate(0,50px)',
  });

  useChain(inView ? [stripeRef, contentRef] : [contentRef, stripeRef], [.5, 1]);

  return (
    <Pane inViewRef={paneRef}>
      <animated.svg width='100%' height='200px' style={{position: 'absolute', top: '308px'}}>
        <animated.rect x='0' y='0' height='100%' width={stripe.length} fill={PRIMARY_COLOUR}></animated.rect>
      </animated.svg>
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
    </>
  );

  const [ref, inView] = useInView({threshold: 0.5, triggerOnce: true});

  const textTrail = useTrail(text.props.children.length, {
    from: {opacity: 0, transform: 'translate3d(0, 50px, 0'},
    opacity: inView ? 1 : 0,
    transform: inView ? 'translate3d(0,0,0)' : 'translate3d(0,25px,0)'
  });

  return (
    <Pane inViewRef={ref}>
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
    <div id='app'>
      <Landing/>
      <About/>
    </div>
  );
};

ReactDOM.render(<App/>, document.getElementById('root'));
