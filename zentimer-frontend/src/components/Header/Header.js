import React from 'react';

import classes from './Header.module.css';
import Navigation from '../Navigation/Navigation';

const header = (props) => {
  return (
    <header className={classes.Header}>
      <Navigation click={props.click} navs={props.navs}/>
    </header>
  );
};

export default header;