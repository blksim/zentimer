import React from 'react';

import classes from './HorizontalSpinner.module.css';

const horizontalSpinner = (props) => {
  return (
  <div className={classes.Spinner}>
    <button className={classes.Button} onClick={props.minus}>-</button>
    <button className={classes.Button}>{props.value}</button>
    <button className={classes.Button} onClick={props.plus}>+</button>
  </div>
  );
};
export default horizontalSpinner;