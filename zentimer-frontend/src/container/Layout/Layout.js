import React, { Component } from 'react';

import classes from './Layout.module.css';
import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main';
import Timer from '../../components/Timer/Timer';
import Tasks from '../../components/Tasks/Tasks';
import Footer from '../../components/Footer/Footer';
import axios from 'axios';

class Layout extends Component {
  state = {
    quotes: [
      'Self-control is strength. Calmness is mastery.'
    ],
    focusDuration: 25,
    breakDuration: 5,
    timeLeft: '',
    streakLeft: 0,
    streakFinished: 0,
    title: 'Meditation',
    isFocusMode: false,
    isBreakMode: false,
    isFinished: false,
    tasks: []
  };

  getZeroPrefixedTime = (time) => {
    if (time.min < 10) {
      time.min = '0' + time.min;
    }
    if (time.sec < 10) {
      time.sec = '0' + time.sec;
    }
    return time.min + ' : ' + time.sec;
  };

  countdown = () => {
    let sec = 60;
    let min = this.state.focusDuration;
    const intervalId = setInterval(() => {
      if (min === 0) {
        clearInterval(intervalId);
        this.setState({ isFinished: true });
      }
      if (sec === 0) {
        sec = 60;
        min--;
      }
      sec--;
      this.setState({
        timeLeft: this.getZeroPrefixedTime({
          min: min,
          sec: sec
        })
      });
    }, 1000);
  };

  componentDidMount() {
    //this.countdown();
    axios.get('https://zentimer-2fbe5.firebaseio.com/tasks.json')
      .then((res) => {
        const tasks = [];
        for (const key in res.data) {
          res.data[key].id = key;
          tasks.push(res.data[key]);
        }
        this.setState({ tasks: tasks })
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render () {
    const style = {
      display: 'flex'
    }
    return (
    <div className={classes.Layout}>
      <Header />
      {/* <Main text={this.state.quotes[0]}/> */}
      <main style={style}>
      <Timer 
        timeLeft={this.state.timeLeft}
        title={this.state.title}
        streakLeft={this.state.streakLeft}
        streakFinished={this.state.streakFinished}/>
      <Tasks 
        title={this.state.title}
        focusDuration={this.state.focusDuration}
        breakDuration={this.state.breakDuration}
        tasks={this.state.tasks}
      />
      </main>
      <Footer />
    </div>)
  }
};

export default Layout;