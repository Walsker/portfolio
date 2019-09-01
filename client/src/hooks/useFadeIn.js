/*
 * A hook for fading in elements when they have been scrolled to
 */
import {useTrail} from 'react-spring';

const useFadeIn = (number, ref, inView = true) => (useTrail(number, {
  ref: ref,
  from: {opacity: 0, transform: 'translateX(-50px)'},
  opacity: inView ? 1 : 0,
  transform: inView ? 'translateX(0)' : 'translateX(-50px)'
}));

export default useFadeIn;