import React from 'react';

import classes from './Navigation.module.css';
import NavigationItems from './NavigationItems/NavigationItems';

const navigation = (props) => {
  return (
    <nav className={classes.Navigation}>
      <NavigationItems />
    </nav>
  );
};

export default navigation;