import React from 'react';

import classes from './Modal.module.css'
import Form from '../Form/Form';

const modal = (props) => {
  let classList = [classes.Modal];

  if (props.active) {
    classList.push(classes.Active);
  }
  
  return (<div className={classList.join(' ')}>
    <span className={classes.Close} onClick={props.close}></span>
    <h1 className={classes.Title}>{props.type}</h1>
    <Form 
      active={props.active} 
      type={props.type} 
      fields={props.fields}
      close={props.close}
      submit={props.submit}/>
  </div>);
}

export default modal;