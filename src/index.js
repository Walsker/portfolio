import React, {useRef} from 'react';
import ReactDOM from 'react-dom';
import {useChain, useSpring, useTrail, animated} from 'react-spring';
import {useInView} from 'react-intersection-observer';
import './index.css';

const PRIMARY_COLOUR = '#E23849';

const Pane = ({children, inViewRef}) => (
  <div ref={inViewRef} className='pane'>
    {children}
  </div>
);

const Landing = () => {
  const pRef = useRef();

  const text = (
    <>
      <h1>Welcome to my site</h1> 
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam diam quam, dictum sed laoreet dictum, laoreet eget nibh. Praesent porta tempor dui, quis eleifend orci efficitur ut. Ut in nisl hendrerit, consequat tellus consequat, cursus justo. Duis neque justo, convallis ut eleifend id, commodo non purus. Fusce auctor dui in libero volutpat, a auctor mi semper. Mauris auctor sed massa sed porta. Morbi malesuada justo quis quam tincidunt, vel mattis nisi scelerisque. Aenean pulvinar nibh elit. Donec non velit id justo convallis iaculis. Vivamus pretium est felis, sit amet faucibus nunc vulputate sit amet. Fusce neque urna, molestie vel aliquet in, fringilla a mi. Vivamus malesuada ligula tortor, eu molestie mauris placerat sed. Quisque sollicitudin a velit vitae rutrum. Proin nisl nisi, tincidunt quis ex sed, posuere vestibulum diam.
      </p>
      <p ref={pRef}>
        Curabitur ac rhoncus odio. Donec volutpat massa ac posuere auctor. Curabitur rutrum at arcu ut tempor. Fusce dapibus odio eu consectetur sodales. Phasellus venenatis sed nibh in dapibus. Praesent congue sed est vel faucibus. In justo tortor, interdum sit amet arcu ac, ullamcorper viverra elit. Nulla facilisi. Morbi posuere auctor nisi sit amet ultricies. Sed iaculis mauris id nunc consequat venenatis. Integer auctor purus placerat augue aliquam, sed facilisis ex imperdiet.
      </p>
      <p>
        Nulla enim tortor, condimentum ut mauris ac, laoreet ornare elit. Donec faucibus dolor eu bibendum congue. Nunc nec elementum dui, aliquam condimentum lacus. Nam faucibus interdum metus, non auctor purus tristique ut. Nullam bibendum sem ac metus vehicula, pharetra cursus neque commodo. Nam quis molestie sem. Sed imperdiet condimentum urna, ut lacinia lacus vulputate at. Fusce bibendum a massa a vulputate. Suspendisse ut eleifend odio. Praesent fermentum leo sem, bibendum convallis risus rhoncus sed. Mauris cursus auctor porttitor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur pulvinar vel sapien nec pulvinar. Pellentesque feugiat lacus ut ultricies tincidunt.
      </p>
    </>
  );
  console.log('pRef:', pRef.current ? pRef.current.offsetTop : '');
  let top = pRef.current ? pRef.current.offsetTop : '';
  const [ref, inView] = useInView({threshold: 0.5, triggerOnce: true});
  
  const stripeRef = useRef();
  const stripe = useSpring({
    ref: stripeRef,
    from: {length: 0},
    to: {length: window.innerWidth}
  });

  const textRef = useRef();
  const textTrail = useTrail(text.props.children.length, {
    ref: textRef,
    from: {opacity: 0, transform: 'translate3d(0, 50px, 0'},
    opacity: inView ? 1 : 0,
    transform: inView ? 'translate3d(0,0,0)' : 'translate3d(0,50px,0)',
  });

  useChain(inView ? [stripeRef, textRef] : [textRef, stripeRef], [.5, 1]);

  return (
    <Pane inViewRef={ref}>
      <animated.svg width='100vw' height='25vh' style={{position: 'absolute'}}>
        <animated.rect x='0' y='0' height='100%' width={stripe.length} fill={PRIMARY_COLOUR}></animated.rect>
      </animated.svg>
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
