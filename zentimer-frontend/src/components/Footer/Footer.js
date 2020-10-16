import React from 'react';

import classes from './Footer.module.css';

const footer = (props) => {
  return (
  <footer className={classes.Footer}>
    <small className={classes.Copyright}>©2020 Blake Sim</small>
    </footer>
  );
};

export default footer;