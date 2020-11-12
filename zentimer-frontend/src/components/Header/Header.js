import React from 'react';

import classes from './Header.module.css';
import { Link } from '@reach/router';

import { GoogleLogout } from 'react-google-login';
import { GOOGLE_CLIENT_ID } from '../../shared/clientId';

const header = (props) => {
  let elements = null;
  const googleLogout = (<GoogleLogout
      clientId={GOOGLE_CLIENT_ID}
      buttonText="Logout"
      onLogoutSuccess={() => this.logoutHandler()}
      render={renderProps => ( <a className={classes.NavigationLink} onClick={renderProps.onClick} disabled={renderProps.disabled}>logout</a>)}
    />);

  if (props.auth) {
    elements = (<nav className={classes.Navigation}>
      <Link className={classes.NavigationLink} exact to="/user/stat" onClick={props.click}>stat</Link>
      {props.authType === 'google' ? googleLogout : <Link className={classes.NavigationLink} to="/logout" onClick={props.logout}>logout</Link>}
    </nav>); 
  } else {
    elements = (<nav className={classes.Navigation}>
      <Link className={classes.NavigationLink} to="/login" onClick={props.click}>login</Link>
      <Link className={classes.NavigationLink} to="/signup" onClick={props.click}>signup</Link></nav>);
  }
  return <header className={classes.Header}>{elements}</header>;  
};

export default header;