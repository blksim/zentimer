import React from 'react';

import { GoogleLogin } from 'react-google-login';
import { GOOGLE_CLIENT_ID } from '../../../../shared/clientId';
import classes from './Auth.module.css';

import { refreshTokenSetup } from '../../../../shared/refreshTokenSetup';
import { navigate } from '@reach/router';

const auth = (props) => {
  const googleLoginSuccess = (res) => {
      localStorage.setItem('id_token', res.tokenId);
      refreshTokenSetup(res);
      navigate('/');
  };
  
  const googleLoginFailure = (res) => {
      console.log('[Login failed] res:', res);
  };
  const googleLogin = (<GoogleLogin
    clientId={GOOGLE_CLIENT_ID}
    onSuccess={props.onSuccess}
    onFailure={props.onFailure}
   // onSuccess={googleLoginSuccess}
   // onFailure={googleLoginFailure}
    cookiePolicy={'single_host_origin'}
    buttonText="Login with Google"
    style={{ marginTop: '100px', width: '100%' }}
    isSignedIn={false}
  />);

  return (
    <form onSubmit={props.submit}>
      {props.fields.map((field, index) => {
        return (<div key={index}>
          <input
            className={classes.Input}
            type={field}
            placeholder={"Enter " + field}
            autoComplete={field === "password" ? "current-password" : ""}
            onChange={props.change}
          />
          <small className={classes.Error}>
          {field === 'email' 
            ? props.emailError 
            : props.passwordError}
          </small>
        </div>)
      })}
      <button className={classes.Button} onClick={props.close}>Cancel</button>
      <button 
        className={classes.Button} 
        type="submit"
        disabled={!props.valid}>Submit</button>
      {props.type === 'login' ? googleLogin : null }
    </form>
  );
};

export default auth;