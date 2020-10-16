import React, { Component } from 'react';

import classes from './Layout.module.css';
import Header from '../../components/Header/Header';

class Layout extends Component {
  render () {
    return (
    <div className={classes.Layout}>
      <Header />
    </div>)
  }
};

export default Layout;