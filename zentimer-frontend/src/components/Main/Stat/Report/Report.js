import React from 'react';

import classes from './Report.module.css';

const report = (props) => {
  return <div className={classes.Report}>
    <h3>Hey! you've grinded for <b>{props.totalHours} hours</b> in total!</h3>
    <p>Your major distractor is <b>{props.distractor}</b></p>
    <p className={classes.Share}>Share the record with your friends!🤗</p>
  </div>
};

export default report;