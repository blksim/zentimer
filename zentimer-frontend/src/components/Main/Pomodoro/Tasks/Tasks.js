import React from 'react';

import classes from './Tasks.module.css';
import Task from './Task/Task';

const Tasks = (props) => {
  return (
    <section className={classes.Tasks}>
      <ul className={classes.TaskItems}>
        <Task 
          type='new'
          titleChange={props.titleChange}
          value={props.count} 
          minus={props.plusClick} 
          plus={props.minusClick}
          saveClick={props.saveClick}
        />
        <div className={classes.Divider}></div>
      { props.tasks.map((task) => {
        return (<Task 
          key={task.id} 
          title={task.title} 
          value={task.count} 
          titleChange={props.titleChange}
          minus={props.plusClick} 
          plus={props.minusClick}
          update={props.updateClick}
          change={props.titleChange}
         delete={props.deleteClick}
        />)})
      }
      </ul>
      <button className={classes.Import} onClick={props.import}>Import from...</button>
    </section>
  );
};

export default Tasks;