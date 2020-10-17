import React from 'react';

import classes from './Clock.module.css';

const clock = (props) => {
  return <div className={classes.Clock}>{props.timeLeft}</div>;
};

export default clock;