import React from 'react';

import classes from './Settings.module.css';
import VerticalSpinner from '../../Spinner/VerticalSpinner/VerticalSpinner';

const settings = (props) => {
  return (
    <form onSubmit={props.saveConfig}>
      {props.keys.map((field, index) => {
        if (index < 4) {
          return (
            <div className={classes.Setting} key={index}>
              <div className={classes.Field}>{props.keys[index]}</div>
              <VerticalSpinner 
                className={classes.VerticalSpinner} 
                value={field}
                plus={props.plus}
                minus={props.minus}
              />
            </div>)
        }
      })}</form>)};
        // } else if (index === 4) {
        //   return (
        //     <div className={classes.Setting} key={index}>
        //       <select 
        //       className={classes.Selectbox} 
        //       onChange={(event) => selectHandler(event, {field, index})}>
        //         <option value="default">{fields[index]}</option>
        //         <option>sample1</option>
        //         <option>sample2</option>
        //         <option>sample3</option>
        //       </select>
        //     </div>
        //   )
        // } else {
        //   return (
        //   <div className={classes.Setting} key={index}>
        //     <div className={classes.Field}>{fields[index]}</div>
        //     <input 
        //       className={classes.Checkbox} 
        //       type="checkbox" 
        //       onChange={() => checkHandler(field, index)}
        //       defaultChecked/>
        //   </div>
        //   )
        // }
      // })}
      // <button type="submit" className={classes.Button}>Save</button>
      // <button className={classes.Button} onClick={props.close}>Cancel</button>
   // </form>
//}
export default settings;