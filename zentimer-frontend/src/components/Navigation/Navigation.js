import React from 'react';

import classes from './Navigation.module.css';
import NavigationItems from './NavigationItems/NavigationItems';

const Navigation = (props) => {
  return (
    <nav className={classes.Navigation}>
      <NavigationItems />
    </nav>
  );
};

export default Navigation;