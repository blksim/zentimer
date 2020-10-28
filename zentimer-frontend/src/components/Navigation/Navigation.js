import React from 'react';

import classes from './Navigation.module.css';
import NavigationItems from './NavigationItems/NavigationItems';

const navigation = (props) => {
  return (
    <nav className={classes.Navigation}>
      <NavigationItems click={props.click} navs={props.navs}/>
    </nav>
  );
};

export default navigation;