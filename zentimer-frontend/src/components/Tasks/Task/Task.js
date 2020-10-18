import React from 'react';

import classes from './Task.module.css';

const task = (props) => {
  return <li className={classes.Task}>{props.title}</li>;
};

export default task;