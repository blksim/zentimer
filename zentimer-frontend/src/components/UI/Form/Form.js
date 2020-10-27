import React, { useState } from 'react';

import classes from './Form.module.css';

const Form = (props) => {
  const [state, setState] = useState({
    email: {
      valid: false,
      message: '',
      value: ''
    },
    password: {
      valid: false,
      message: '',
      value: ''
    },
    valid: false
  });

  const inputChangeHandler = (event, field) => {
    validator(event.target.value, field);
  }

  const submitHandler = (event) => {
    event.preventDefault();
  }

  const validator = (value, field) => {
    const regexForEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const regexForPasswd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    const messageForEmail = 'Please enter proper email';
    const messageForPassword = 'Please enter 8 - 20 upper/lowercase letters at least one number and special character';

    switch (field) {
      case 'email':
        if (regexForEmail.test(value)) {
          setState({
            ...state,
            email: {
              ...state.email,
              valid: true,
              value: value,
              message: ''
            }
          });
        } else {
          setState({
            ...state,
            email: {
              ...state.email,
              valid: false,
              value: value,
              message: messageForEmail
            }
          });
        }
        break;
      case 'password':
        if (regexForPasswd.test(value)) {
          setState({
            ...state,
            password: {
              ...state.password,
              valid: true,
              value: value,
              message: ''
            }
          });
        } else {
          setState({
            ...state,
            password: {
              ...state.password,
              valid: false,
              value: value,
              message: messageForPassword
            }
          });
        }
      default:
        break;
    }
  }

  return (
    <form className={classes.Form} onSubmit={(event) => submitHandler(event)}>
      {props.fields.map((field, index) => {
          return (
          <div key={index}>
            <input
              className={classes.Input}
              type={field}
              placeholder={"Enter " + field}
              onChange={(event) => inputChangeHandler(event, field)}
            />
            <small className={classes.Error}>
            {field === 'email' 
              ? state.email.message 
              : state.password.message}
            </small>
          </div>)
        })
      }
    <button 
      type="button" 
      className={classes.Button} 
      onClick={props.close}>Cancel</button>
    <button 
      type="submit" 
      className={classes.Button} 
      disabled={!state.valid}>{props.type}</button>
  </form>
  )
}

export default Form;
