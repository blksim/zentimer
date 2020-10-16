import React from 'react';

import classes from './Main.module.css';

const main = (props) => {
  return (
  <main className={classes.Main}>
    <div className={classes.Wrapper}>
      <p className={classes.Paragraph}>{props.text}</p>
    </div>
  </main>)
}

export default main;