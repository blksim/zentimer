import React from 'react';

import classes from './Backdrop.module.css';

const backdrop = (props) => {
  return <div 
    onClick={props.click} 
    className={props.active 
      ? [classes.Backdrop, classes.Active].join(' ') 
      : classes.Backdrop}
    ></div>;
};

export default backdrop;

