import React from 'react';

import classes from './Header.module.css';
import { Link } from '@reach/router';
import { GoogleLogout } from 'react-google-login';
import { GOOGLE_CLIENT_ID } from '../../shared/clientId';

const Logout = () => {
  const onSuccess = () => {
    localStorage.removeItem('id_token');
  }
  return (
      <GoogleLogout
        clientId={GOOGLE_CLIENT_ID}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
        render={renderProps => ( <a className={classes.NavigationLink} onClick={renderProps.onClick} disabled={renderProps.disabled}>logout</a>)}
      />
  )
};
const header = (props) => {
  let elements = null;
  
  if (props.auth) {
    elements = (<nav className={classes.Navigation}>
      <Link className={classes.NavigationLink} to="/stat">stat</Link>
      <Logout>logout</Logout></nav>); 
  } else {
    elements = (<nav className={classes.Navigation}>
      <Link className={classes.NavigationLink} to="/login">login</Link>
      <Link className={classes.NavigationLink} to="/signup">signup</Link></nav>);
  }
  return <header className={classes.Header}>{elements}
  </header>;  
};

export default header;