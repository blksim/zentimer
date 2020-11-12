import React from 'react';

import classes from './Main.module.css';
import Timer from '../Main/Timer/Timer';
import Chart from '../Main/Chart/Chart';
import Report from '../Main/Report/Report';

const main = (props) => {
  let elements = null;
  if (props.auth && props.path === '/user/stat') {
    elements = <div><Chart/><Report totalHours={1000} distractor="twittering with no reason"/></div>;
  }
  else if (props.auth && props.path === '/user/') {
    elements = (
      <div className={classes.TimerWrapper}>
         <Timer 
          minutes={props.minutes}
          seconds={props.seconds}
          timeLeft={props.timeLeft}
          title={props.title}
          status={props.status}
          switch={props.switch}
          streakLeft={props.streakLeft}
          streakFinished={props.streakFinished}
          setting={props.setting} 
        />
        {/*
        <Tasks 
          focusDuration={this.state.focusDuration}
          breakDuration={this.state.breakDuration}
          tasks={this.state.tasks}
          titleChange={(event) => this.titleChangeHandler(event)}
          saveClick={() => this.saveClickHandler()}
          plusClick={(event) => this.plusClickHandler(event)}
          minusClick={(event) => this.minusClickHandler(event)}
          updateClick={() => this.updateClickHandler(id)}
          deleteClick={() => this.deleteClickHandler(id)}
        /> */}
      </div>);
  } else {
    elements = 
    <div className={classes.Wrapper}>
      <p className={classes.Paragraph}>Self-control is strength. Calmness is mastery.</p>
    </div>;
  }
  return <main path={props.path} className={classes.Main}>{elements}</main>;
}

export default main;