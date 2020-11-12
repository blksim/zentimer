import React, { useState } from 'react';

import classes from './Settings.module.css';
import VerticalSpinner from '../../Spinner/VerticalSpinner/VerticalSpinner';
import axios from '../../../../shared/axios';
import { navigate } from '@reach/router';

const Settings = (props) => {
  const fields = ['focus', 'break', 'long break', 'long break delay', 'notification sound', 'let me know before 1 minute', 'autopilot mode', 'log distraction'];   
  const stateobj = {};
  fields.map((field, index) => { return stateobj[field] = props.config[fields[index]] });
  
  const [state, setState] = useState(stateobj);

  const plusHandler = (field) => {
    if (state[field] > 60) {
      setState({ ...state, [field]: state[field] });
    } else {
      setState({ ...state, [field]: state[field] + 1 });
    }
  };
  
  const minusHandler = (field) => {
    if (state[field] < 0) {
      setState({ ...state, [field]: 0 });
    } else {
      setState({ ...state, [field]: state[field] - 1});
    } 
  };

  const selectHandler = (event, field) => {
    const src = event.target.value;
    const audio = new Audio(src);
    audio.play();
    setState({ ...state, [field]: src});
  };

  const checkHandler = (field) => {
    setState({ ...state, [field]: !state[field] });
  };
  
  const submitHandler = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3001/config', {
      headers: { 'Authorization': 'Basic ' + localStorage.getItem('token') },
      data: state
    })
    .then((res) => {
      alert('Updated!');
      navigate('/');
    })
    .catch((err) => {
      console.log(err);
    });
  };

  return (
  <form onSubmit={(event) => submitHandler(event)}>
      {fields.map((field, index) => {
        if (index < 4) {
          return (
            <div className={classes.Setting} key={index}>
              <div className={classes.Field}>{field}</div>
              <VerticalSpinner
                className={classes.VerticalSpinner}
                value={state[field]}
                plus={() => plusHandler(field)}
                minus={() => minusHandler(field)}
              />
            </div>
          )
        } else if (index === 4) {
          return (
            <div className={classes.Setting} key={index}>
              <select 
              className={classes.Selectbox} 
              onChange={(event) => selectHandler(event, field)}>
                <optgroup>
                  <option value="default">{field}</option>
                  <option value="./bell1.wav">bell1</option>
                  <option value="./bell2.mp3">bell2</option>
                  <option value="./bell3.wav">bell3</option>
                </optgroup>
              </select>
            </div>
          )
        } else {
          return (
          <div className={classes.Setting} key={index}>
            <div className={classes.Field}>{field}</div>
            <input 
              className={classes.Checkbox} 
              type="checkbox" 
              onChange={() => checkHandler(field)}
              defaultChecked
            />
          </div>
          )
        }})
      }
      <button className={classes.Button} onClick={props.close}>Cancel</button>
      <button type="submit" className={classes.Button}>Save</button>
    </form>
  )
};

export default Settings;