import React, { Component } from 'react';

import classes from './Layout.module.css';
import Header from '../../components/Header/Header';
import Modal from '../../components/UI/Modal/Modal';
import Main from '../../container/Main/Main';
import Footer from '../../components/Footer/Footer';

import { Router } from '@reach/router';
 
class Layout extends Component {
  state = {
    nav: '',
    isAuthenticated: false,
    isOauth: ''
  };

  navHandler = (event) => {
    this.setState({ nav: event.target.text })
  };

  render () {
    return (
    <div className={classes.Layout}>
      <Header
        auth={this.state.isAuthenticated}
        click={(event) => this.navHandler(event)}
      />
      <Router>
        <Modal path={"/" + this.state.nav} />
        <Main path={this.state.isAuthenticated ? '/tasks' : '/'}/>
      </Router> 
      <Footer />
    </div>
    )
  }
};

export default Layout;