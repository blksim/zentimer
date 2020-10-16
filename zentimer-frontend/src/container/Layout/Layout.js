import React, { Component } from 'react';

import classes from './Layout.module.css';
import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main';

class Layout extends Component {
  state = {
    quotes: [
      'Self-control is strength. Calmness is mastery.'
    ]
  };

  render () {
    return (
    <div className={classes.Layout}>
      <Header />
      <Main text={this.state.quotes[0]}/>
    </div>)
  }
};

export default Layout;