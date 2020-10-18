import React from 'react';

import classes from './Streak.module.css';

const streak = (props) => {
  return (
  <div className={classes.Streak}>
    <p>{props.left}&nbsp;{props.left > 1 ? 'streaks' : 'streak'} left for {props.title}</p>
    <p>{props.finished}&nbsp;{props.left > 1 ? 'streaks' : 'streak'} completed</p>
    <i class="fa fa-cog"></i>
  </div>
  )
};

export default streak;