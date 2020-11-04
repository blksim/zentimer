import React from 'react';

import { GoogleLogin } from 'react-google-login';
import { refreshTokenSetup } from '../../../../shared/refreshTokenSetup';
import { GOOGLE_CLIENT_ID } from '../../../../shared/clientId';
import { navigate } from '@reach/router';
import classes from './Auth.module.css';

const Login = () => {
  const onSuccess = (res) => {
    console.log('[Login Success] currentUser:', res.profileObj);
    localStorage.setItem('id_token', res.profileObj.googleId);

    refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    console.log('[Login failed] res:', res);
  };

  return (
    <GoogleLogin
        clientId={GOOGLE_CLIENT_ID}
        buttonText="Login with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        style={{ marginTop: '100px' }}
        isSignedIn={true}
      />
  )
}

const auth = (props) => {
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
      {props.type === 'login' ? <Login /> : null }
    </form>
  );
};

export default auth;