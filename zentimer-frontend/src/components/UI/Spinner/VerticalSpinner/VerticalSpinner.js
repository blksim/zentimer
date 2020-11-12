import React from 'react';

import classes from './VerticalSpinner.module.css';

const verticalSpinner = (props) => {
  return (
    <div className={classes.Wrapper}>
      <div className={classes.Value}>{props.value}</div>
      <div className={classes.ButtonWrapper}>
        <button type="button" className={classes.Button} onClick={props.plus}>+</button>
        <button type="button" className={classes.Button} onClick={props.minus}>-</button>
      </div>
    </div>)
};

export default verticalSpinner;