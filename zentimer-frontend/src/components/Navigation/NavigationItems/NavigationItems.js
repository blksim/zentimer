import React from 'react';

import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem title="Login" />
      <NavigationItem title="Signup" />
    </ul>
  )
};

export default NavigationItems;