import React from 'react';

import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
      { props.navs.map((nav, index) => {
          return <NavigationItem 
            key={index} 
            title={nav} 
            click={props.click}
            />
        })
      }
    </ul>
);

export default navigationItems;