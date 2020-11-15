import React from 'react';

import classes from './Pomodoro.module.css';
import Timer from './Timer/Timer';
import Tasks from './Tasks/Tasks';

const pomodoro = (props) => {
  return <div className={classes.TimerWrapper}>
      <Timer 
        minutes={props.minutes}
        seconds={props.seconds}
        title={props.title}
        status={props.status}
        switch={props.switch}
        streakLeft={props.streakLeft}
        streakFinished={props.streakFinished}
        setting={props.setting} 
      />
      <Tasks 
        tasks={['one', 'two']}
        focusDuration={props.settings.focus}
        breakDuration={props.settings.break}
        list={props.tasks}
        plus={props.plus}
        // titleChange={(event) => this.titleChangeHandler(event)}
        // saveClick={() => this.saveClickHandler()}
        // plusClick={(event) => this.plusClickHandler(event)}
        // minusClick={(event) => this.minusClickHandler(event)}
        // updateClick={() => this.updateClickHandler(id)}
        // deleteClick={() => this.deleteClickHandler(id)}  
      />
    </div>
};

export default pomodoro;