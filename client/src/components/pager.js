import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons';
import styles from './pager.module.css';

const Indicator = ({index, numPages}) => {
  return (
    <div className={styles.header}>
      {index+1}
    </div>
  );
};

const Navigation = ({prev, next}) => {
  return (
    <div className={styles.footer}>
      <FontAwesomeIcon className={styles.arrow} onClick={prev} icon={faArrowLeft} size='2x'/>
      <FontAwesomeIcon className={styles.arrow} onClick={next} icon={faArrowRight} size='2x'/>
    </div>
  );
};


const Window = ({children, ...rest}) => {
  const [index, selectPage] = useState(0);

  return (
    <div className={styles.window} {...rest}>
      <Indicator index={index} numPages={children.length}/>
      {children[index]}
      <Navigation 
        prev={() => selectPage((index-1) < 0 ? (children.length-1) : (index-1))}
        next={() => selectPage((index+1) % children.length)}
      />
    </div>
  );
};

const Frame = props => {
  return (
    <div className={styles.frame}>
      {props.children}
    </div>
  );
};

export default {Frame, Window};