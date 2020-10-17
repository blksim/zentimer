import React from 'react';

import classes from './Timer.module.css';
import Clock from '../UI/Clock/Clock';

const timer = (props) => {
  return (
  <section className={classes.Timer}>
    <Clock timeLeft={props.timeLeft}/>
  </section>
  );
};

export default timer;