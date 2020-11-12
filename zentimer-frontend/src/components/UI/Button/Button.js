import React from 'react';

import classes from './Button.module.css';

const button = (props) => {
  return <button 
    type="button" 
    className={classes.Button} 
    onClick={props.click}>
    {props.title}</button>;
};

export default button;