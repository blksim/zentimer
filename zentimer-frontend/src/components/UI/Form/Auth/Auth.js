import React from 'react';

import classes from './Auth.module.css';

const auth = (props) => {
  return (
    <form onSubmit={props.submit}>
      {props.fields.map((field, index) => {
        return (<div key={index}>
          <input
            className={classes.Input}
            type={field}
            autoComplete={field === "password" ? "current-password" : ""}
            placeholder={"Enter " + field}
            onChange={props.change}
          />
          <small className={classes.Error}>
          {field === 'email' 
            ? props.email 
            : props.password}
          </small>
        </div>)
      })}
      <button className={classes.Button} onClick={props.close}>Cancel</button>
      <button 
        className={classes.Button} 
        type="submit"
        disabled={!props.valid}>Submit</button>
    </form>
  );
};

export default auth;