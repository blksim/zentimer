import React from 'react';

import classes from './Timer.module.css';
import Clock from '../UI/Clock/Clock';
import Button from '../UI/Button/Button';

const timer = (props) => {
  return (
  <section className={classes.Timer}>
    <Clock timeLeft={props.timeLeft}/>
    <div>
      <Button title="Pause"/>
      <Button title="Skip"/>
    </div>
  </section>
  );
};

export default timer;