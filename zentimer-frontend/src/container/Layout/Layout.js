import React, { Component } from 'react';

import classes from './Layout.module.css';
import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main';
import Timer from '../../components/Timer/Timer';
import Footer from '../../components/Footer/Footer';

class Layout extends Component {
  state = {
    quotes: [
      'Self-control is strength. Calmness is mastery.'
    ],
    focusDuration: 25,
    breakDuration: 5,
    timeLeft: '',
    isFocusMode: false,
    isBreakMode: false,
    isFinished: false,
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
    this.countdown();
  };

  render () {
    return (
    <div className={classes.Layout}>
      <Header />
      {/* <Main text={this.state.quotes[0]}/> */}
      <Timer timeLeft={this.state.timeLeft}/>
      <Footer />
    </div>)
  }
};

export default Layout;