import React from 'react';
import {Pane} from 'components';
import styles from './index.module.css';

const Portfolio = () => {
  return (
    <Pane>
      <div>hello</div>
    </Pane>
  );
};

const Projects = () => {
  return (
    <div id={styles.container}>
      <Portfolio/>
    </div>
  );
};

export default Projects;