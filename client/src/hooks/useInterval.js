/* 
 * useInterval: A hook that makes setInterval declarative
 * source: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 */

import {useEffect, useRef} from 'react';

const useInterval = (callback, interval) => {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (interval !== null) {
      let id = setInterval(tick, interval);
      return () => clearInterval(id);
    }
  }, [interval]);
};

export default useInterval;