import React from 'react';

import classes from './Modal.module.css'
import Backdrop from '../Backdrop/Backdrop';
import Auth from '../Form/Auth/Auth';
import Settings from '../Form/Settings/Settings';
import { navigate } from "@reach/router";

const modal = (props) => {
  let elements = null;
  let type = props.path.split('/')[1];
  
  switch (type) {
    case 'settings' :
      elements = 
        (<Settings
          fields={props.config.fields}
          config={props.config}
          plus={props.plus}
          minus={props.minus}
          select={props.select}
          check={props.check}
          close={props.close}
          />); 
    break;
    case 'login' :
        elements = (<Auth 
          type={type} 
          fields={['email', 'password']}
          close={() => navigate('/')}
          emailError={props.emailError}
          passwordError={props.passwordError}
          valid={props.valid}
          onSuccess={props.onSuccess}
          onFailure={props.onFailure}
          change={props.change}
          submit={props.submit} />);
    break;
    case 'signup':
        elements = (<Auth 
          type={type} 
          fields={['email', 'password']}
          close={() => navigate('/')}
          emailError={props.emailError}
          passwordError={props.passwordError}
          valid={props.valid}
          onSuccess={props.onSuccess}
          onFailure={props.onFailure}
          change={props.change}
          submit={props.submit} />);
    break;
  
    default:
      elements = <div>not found</div>
      break;
  }
 
  return <div>
    <Backdrop click={() => navigate('/')}/>
    <div className={classes.Modal}>
      <span className={classes.Close} onClick={() => navigate('/')}></span>
      <h1 className={classes.Title}>{type}</h1>
      {elements}
    </div>
  </div>;
}
export default modal;
