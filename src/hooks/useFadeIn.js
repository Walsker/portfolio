/*
 * A hook for fading in elements when they have been scrolled to
 */
import {useTrail} from 'react-spring';

const useFadeIn = (number, ref, isVisibile) => (useTrail(number, {
  ref: ref,
  from: {opacity: 0, transform: 'translateY(50px'},
  opacity: isVisibile ? 1 : 0,
  transform: isVisibile ? 'translateY(0)' : 'translateY(25px)'
}));

export default useFadeIn;