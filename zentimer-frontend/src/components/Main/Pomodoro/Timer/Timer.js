import React from 'react';

import classes from './Timer.module.css';
import Button from '../../../UI/Button/Button';
import { Link } from '@reach/router';

const timer = (props) => {
  return (
  <section className={classes.Timer}>
    <div style={{ fontSize: '200px' }}>{props.minutes < 10 ? '0' + props.minutes : props.minutes} : {props.seconds < 10 ? '0' + props.seconds : props.seconds}</div>
    <div>
      <Button title={!props.status ? 'start' : 'stop'} click={props.switch}/>
      <Button title='skip' click={props.switch}/>
    </div>
    <div className={classes.Streak}>
      <p>{props.streakLeft}&nbsp;{props.streakLeft > 1 ? 'streaks' : 'streak'} left for {props.title}</p>
      <p>{props.streakFinished}&nbsp;{props.streakLeft > 1 ? 'streaks' : 'streak'} completed</p>
      <Link to="/settings" className={classes.Icon}><i className="fa fa-cog" onClick={props.setting}></i></Link>
    </div>
  </section>
  );
};

export default timer;