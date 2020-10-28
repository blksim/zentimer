import React from 'react';

import classes from './NavigationItem.module.css';

const navigationItem = (props) => {
  return <li className={classes.NavigationItem} onClick={props.click}>{props.title}</li>
};

export default navigationItem;