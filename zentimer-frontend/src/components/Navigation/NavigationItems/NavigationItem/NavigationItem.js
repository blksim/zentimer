import React from 'react';

import classes from './NavigationItem.module.css';

const NavigationItem = (props) => {
  return <li className={classes.NavigationItem}>{props.title}</li>;
};

export default NavigationItem;