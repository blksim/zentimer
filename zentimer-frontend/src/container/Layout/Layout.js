import React, { Component } from 'react';

import classes from './Layout.module.css';
import Navigation from '../../components/Navigation/Navigation';

class Layout extends Component {
  render () {
    return (
    <div className={classes.Layout}>
      <Navigation />
    </div>)
  }
};

export default Layout;