import React from 'react';

import classes from './Task.module.css';
import HoritzontalSpinner from '../../UI/Spinner/HorizontalSpinner/HorizontalSpinner';

const task = (props) => {
  return (
    <div className={classes.Wrapper}>
      <p className={classes.Task}>{props.title}</p>
      <HoritzontalSpinner change={props.change}/>
    </div>
)
};

export default task;