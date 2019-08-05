import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faLink} from '@fortawesome/free-solid-svg-icons';
import {
  faLinkedin,
  faTwitter,
  faGithub
} from '@fortawesome/free-brands-svg-icons';
import {button} from './socialIcon.module.css';

const SocialIcon = ({type, link, size}) => {
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
  default:
    icon = faLink;
  }

  return (
    <a className={button} target='_blank' rel='noopener noreferrer external' href={link}>
      <FontAwesomeIcon icon={icon} size={size ? size : 'lg'}/>
    </a>
  );
};

export default SocialIcon;
