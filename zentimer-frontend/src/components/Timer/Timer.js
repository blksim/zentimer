import React from 'react';

import classes from './Timer.module.css';
import Clock from '../UI/Clock/Clock';
import Button from '../UI/Button/Button';
import Streak from './Streak/Streak';

const timer = (props) => {
  return (
  <section className={classes.Timer}>
    <Clock timeLeft={props.timeLeft}/>
    <div>
      <Button title="Pause"/>
      <Button title="Skip"/>
    </div>
    <Streak 
      title={props.title}
      left={props.streakLeft}
      finished={props.streakFinished} />
  </section>
  );
};

export default timer;