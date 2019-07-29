import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faLinkedin,
  faTwitter,
  faGithub
} from '@fortawesome/free-brands-svg-icons';
import {button} from './socialLogo.module.css';

const SocialLogo = ({type, link}) => {
  let icon;

  switch (type) {
  case 'LinkedIn':
    icon = faLinkedin;
    break;
  case 'Twitter':
    icon = faTwitter;
    break;
  case 'GitHub':
    icon = faGithub;
    break;
  }

  return (
    <a className={button} target='_blank' rel='noopener noreferrer external' href={link}>
      <FontAwesomeIcon icon={icon} size='lg'/>
    </a>
  );
};

export default SocialLogo;
