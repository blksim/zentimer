import React from 'react';

import classes from './Task.module.css';
import HoritzontalSpinner from '../../UI/Spinner/HorizontalSpinner/HorizontalSpinner';

const task = (props) => {
  let elements = '';

  if (props.type === 'new') {
    elements = (<div className={classes.Wrapper}>
      <input className={classes.Task} onChange={props.title} />
      <HoritzontalSpinner
        minus={props.minus} 
        plus={props.plus}
        value={props.value}
      />
      <button className={classes.Button} onClick={props.save}>&#10004;</button>
    </div>
    )
  } else {
    elements = (<div className={classes.Wrapper}>
      <input 
        className={classes.Task} 
        defaultValue={props.title} 
        onChange={props.change}/>
      <HoritzontalSpinner 
        minus={props.minus} 
        plus={props.plus}
        value={props.value}
      />
      <button className={classes.Button} onClick={props.update}>&#10004;</button>
      <button className={classes.Button} onClick={props.delete}>&#10007;</button>
    </div>)
  }
  return elements;
};

export default task;