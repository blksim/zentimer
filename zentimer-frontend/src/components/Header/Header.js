import React from 'react';

import classes from './Header.module.css';
import { Link } from '@reach/router';

const header = (props) => {
  let elements = null;
  
  if (props.auth) {
    elements = (<nav className={classes.Navigation}>
      <Link className={classes.NavigationLink} to="/stat">stat</Link>
      <Link className={classes.NavigationLink} to="/signup">logout</Link></nav>); 
  } else {
    elements = (<nav className={classes.Navigation}>
      <Link className={classes.NavigationLink} to="/login">login</Link>
      <Link className={classes.NavigationLink} to="/signup">signup</Link></nav>);
  }
  return <header className={classes.Header}>{elements}</header>;  
};

export default header;