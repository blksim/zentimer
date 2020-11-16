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
    isModal: false,
    isAuthenticated: false,
    isOauth: false
  };

  navHandler = (event) => {
    this.setState({ isModal: true, nav: '/' + event.target.text })
  };
  
  logoutHandler = () => {
    console.log('logout');
    localStorage.removeItem('token');
    this.setState({ isAuthenticated: false });
  };

  componentDidMount() {
    console.log('componentDidMount');
    let token = window.location.href.split('/r/')[1];
    if (token) localStorage.setItem('token', token);
    
    localStorage.getItem('token') 
    ? this.setState({ isAuthenticated: true }) 
    : this.setState({ isAuthenticated: false });
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
  }

  render () {
    const modal = this.state.isModal ? <Modal path={this.state.nav} /> : null;
    
    return (
    <div className={classes.Layout}>
      <Header 
        isAuth={this.state.isAuthenticated} 
        click={(event) => this.navHandler(event)}
        logout={() => this.logoutHandler()}
      />
      <Router>
        {modal}
      </Router>
        <Main isAuth={this.state.isAuthenticated}/>
      <Footer />
    </div>
    )
  }
};

export default Layout;