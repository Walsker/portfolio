/*
 * A hook for fading in elements when they have been scrolled to
 */
import {useTrail} from 'react-spring';

const useFadeIn = (number, ref, inView) => (useTrail(number, {
  ref: ref,
  from: {opacity: 0, transform: 'translateY(50px)'},
  opacity: inView ? 1 : 0,
  transform: inView ? 'translateY(0)' : 'translateY(25px)'
}));

export default useFadeIn;