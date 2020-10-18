import React from 'react';

import classes from './Tasks.module.css';
import Task from './Task/Task';

const tasks = (props) => {
  return (
  <section className={classes.Tasks}>
    <ul className={classes.TaskItems}>
      <Task title={props.title}/>
      <Task title={props.title}/>
      <Task title={props.title}/>
      <Task title={props.title}/>
      <Task title={props.title}/>
    </ul>
    <a href="#" className={classes.Import}>Import from...</a>
  </section>);
};

export default tasks;