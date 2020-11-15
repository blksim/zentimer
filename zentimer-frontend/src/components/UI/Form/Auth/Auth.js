import React, { useState, useEffect } from 'react';

import classes from './Auth.module.css';
import { GoogleLogin } from 'react-google-login';
import { GOOGLE_CLIENT_ID } from '../../../../shared/clientId';
import { refreshTokenSetup } from '../../../../shared/refreshTokenSetup';
import axios from 'axios';
import { navigate } from '@reach/router';

const Auth = (props) => {
  const [auth, setAuth] = useState({
    email: {
      isValid: false,
      value: '',
      message: ''
    },
    password: {
      isValid: false,
      value: '',
      message: ''
    },
    result: ''
  });

  const inputChangeHandler = (event) => validator(event.target.value, event.target.type);

  const validator = (value, field) => {
    const regexForEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const regexForPasswd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    const emailError = 'Please enter proper email';
    const passwordError = 'Please enter 8 - 20 upper/lowercase letters at least one number and special character';
    
    switch (field) {
      case 'email':
        regexForEmail.test(value) 
        ? setAuth({ ...auth, email: { isValid: true, value: value, message: '' }})
        : setAuth({ ...auth, email: { isValid: false, value: value, message: emailError }});
       break;
      case 'password':
        regexForPasswd.test(value)
        ? setAuth({ ...auth, password: { isValid: true, value: value, message: '' }})
        : setAuth({ ...auth, password: { isValid: false, value: value, message: passwordError }});
       break;
      default:
        break;
    }
  }

  const loginHandler = async event => {
    event.preventDefault();
    axios.post('http://localhost:3001/login', { email: auth.email.value, password: auth.password.value })
      .then(res => {
        localStorage.setItem('token', res.data.token);
        window.location.reload();
      })
      .catch(async err => {
        await setAuth({ ...auth, result: err.response.data.error });
      });
  };

  const googleLoginSuccess = (res) => {
      localStorage.setItem('token', res.tokenId);
      refreshTokenSetup(res);
      window.location.reload();
  };
  
  const googleLoginFailure = (res) => {
      alert('Login failed: try again several minutes later or login with email/password.');
  };

  const googleLogin = <GoogleLogin
    clientId={GOOGLE_CLIENT_ID}
    onSuccess={googleLoginSuccess}
    onFailure={googleLoginFailure}
    cookiePolicy={'single_host_origin'}
    buttonText="Login with Google"
    style={{ marginTop: '100px', width: '100%' }}
    isSignedIn={false}
  />;

  return (
    <form onSubmit={(event) => loginHandler(event)}>
      {props.fields.map((field, index) => {
        return (
        <div key={index}>
          <input
            className={classes.Input}
            type={field}
            placeholder={"Enter " + field}
            autoComplete={field === "password" ? "current-password" : ""}
            onChange={(event) => inputChangeHandler(event, field)}
          />
          <small className={classes.Error}>{auth[field].message}</small>
        </div>
        )
      })}
      <p className={classes.Error}>{auth.result}</p>
      <button 
        className={classes.Button} 
        type="submit"
        disabled={!(auth.email.isValid && auth.password.isValid)}>Submit</button>
      <button className={classes.Button} onClick={props.close}>Cancel</button>
      { props.type === 'login' ? googleLogin : null }
    </form>
  );
};

export default Auth;