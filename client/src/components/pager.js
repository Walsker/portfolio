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

const Navigation = ({index, numPages, selectPage}) => {
  const disableLeft = index == 0 ? {style: {cursor: 'default', color: 'var(--white)'}} : {};
  const disableRight = index == (numPages-1) ? {style: {cursor: 'default', color: 'var(--white)'}} : {};

  return (
    <div className={styles.footer}>
      <FontAwesomeIcon
        className={styles.arrow}
        onClick={() => selectPage((index-1) < 0 ? 0 : (index-1))}
        icon={faArrowLeft}
        size='2x'
        {...disableLeft}
      />
      <FontAwesomeIcon
        className={styles.arrow}
        onClick={() => selectPage((index+1) >= numPages ? (numPages-1) : (index+1))}
        icon={faArrowRight}
        size='2x'
        {...disableRight}
      />
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
        index={index}
        numPages={children.length}
        selectPage={selectPage}
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