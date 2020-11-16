import React from 'react';

import classes from './Header.module.css';
import { Link } from '@reach/router';
import { GoogleLogout } from 'react-google-login';
import { GOOGLE_CLIENT_ID } from '../../shared/clientId';

const header = (props) => {
  let navigationBar = null;

  const googleLogoutLink = () => 
    <GoogleLogout
      clientId={GOOGLE_CLIENT_ID}
      buttonText="Logout"
      onLogoutSuccess={props.logout}
      onFailure={props.logoutFail}
      redirectUri="/"
      render={renderProps => 
      <Link className={classes.NavigationLink} onClick={renderProps.onClick} disabled={renderProps.disabled}>logout</Link>}
    />;

  if (props.isAuth) {
    navigationBar = 
    <nav className={classes.Navigation}>
      <Link className={classes.NavigationLink} to="/stat" onClick={props.click}>stat</Link>
      {props.isOauth 
        ? googleLogoutLink 
        : <Link className={classes.NavigationLink} to="/logout" onClick={props.logout}>logout</Link>}
    </nav>; 
  } else {
    navigationBar = 
    <nav className={classes.Navigation}>
      <Link className={classes.NavigationLink} to="/login" onClick={props.click}>login</Link>
      <Link className={classes.NavigationLink} to="/signup" onClick={props.click}>signup</Link>
    </nav>;
  }
  return <header className={classes.Header}>{navigationBar}</header>;  
};

export default header;