import React, { useState, useEffect } from 'react';

import classes from './Modal.module.css'
import Auth from '../Form/Auth/Auth';
import Settings from '../Form/Settings/Settings';
import Backdrop from '../Backdrop/Backdrop';
import { navigate } from "@reach/router";

const Modal = (props) => {
  let elements = null;
  let classList = [classes.Modal];

  if (props.type === 'settings') {
    classList.push(classes.Settings);
    elements = 
    (<Settings
      type={props.type} 
      fields={props.config.fields}
      config={props.config}
      plus={props.plus}
      minus={props.minus}
      select={props.select}
      check={props.check}
      close={props.close}
      />);
  } else {
    elements = (<Auth 
    type={props.type} 
    fields={['email', 'password']}
    close={() => navigate('/')}
    emailError={props.emailError}
    passwordError={props.passwordError}
    valid={props.valid}
    onSuccess={props.onSuccess}
    onFailure={props.onFailure}
    change={props.change}
    submit={props.submit} />);
  }

  return (<div>
    <Backdrop click={() => navigate('/')}/>
    <div className={classes.Modal}>
      <span className={classes.Close} onClick={() => navigate('/')}></span>
      <h1 className={classes.Title}>{props.type}</h1>
      {elements}
    </div>
  </div>);
}
export default Modal;
