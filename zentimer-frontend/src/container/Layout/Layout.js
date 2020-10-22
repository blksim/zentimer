import React, { Component } from 'react';

import classes from './Layout.module.css';
import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main';
import Timer from '../../components/Timer/Timer';
import Tasks from '../../components/Tasks/Tasks';
import Footer from '../../components/Footer/Footer';
import axios from '../../shared/axios';

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
    streakTitle: 'Meditation',
    isFocusMode: false,
    isBreakMode: false,
    isFinished: false,
    title: '',
    count: 0,
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

  titleChangeHandler = (event, id) => {
    const input = event.target.value;
    const tasks = [...this.state.tasks];
    if (input && id) {
      tasks.map((task) => {
        if (task.id === id) task.id = input;
        return tasks;
      });
     this.setState(tasks);
    }
    if (input) {
      this.setState({ title: input });
    }
  };

  saveClickHandler = () => {
    axios.post('/tasks.json', {
      title: this.state.title,
      count: this.state.count
    })
    .then((res) => {
      this.setState({
        tasks: [...this.state.tasks, {
          id: res.data.name,
          title: this.state.title,
          count: this.state.count
        }]
      });
    })
    .catch((err) => {
      console.log('err');
    })
  };

  minusClickHandler = (id) => {
    if (!id) {
      if (this.state.count <= 0) {
        this.setState({count: 0}) 
      } else {
        this.setState({count: this.state.count-1});
      }
    } else {
      const tasks = [...this.state.tasks];
      tasks.map((task) => {
        if (task.id === id) {
          task.count = task.count - 1;
          if (task.count <= 0) {
            task.count = 0
          } 
        }
        return tasks;
      });
     this.setState(tasks);
    }
  };

  plusClickHandler = (id) => {
    const maximum = (24 * 60) / (this.state.focusDuration + this.state.breakDuration);
    if (!id) {
      if (this.state.count >= maximum) {
        this.setState({count: maximum})
      } else {
        this.setState({count: this.state.count + 1});
      }
    } else {
      const tasks = [...this.state.tasks];
      tasks.map((task) => {
        if (task.id === id) {
          task.count = task.count + 1;
          if (task.count >= maximum) {
            task.count = maximum
          } 
        }
        return tasks;
      });
      this.setState(tasks);
    }
  }

    // const updateClickHandler = (id) => {
  //   const task = tasks.filter((task) => task.id === id);
  //   axios.put('/tasks/' + id +'.json', task[0])
  //   .then((res) => {
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // };

  // const deleteClickHandler = (id) => {
  //   axios.delete('/tasks/' + id +'.json')
  //   .then((res) => {
  //     const tasks = [ ...props.tasks ];
  //     const updated = tasks.filter(task => { return task.id !== id });
  //     setTasks(updated);
  //   })
  //   .catch((err) => {
  //     console.log('err');
  //   });
  // };

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
        focusDuration={this.state.focusDuration}
        breakDuration={this.state.breakDuration}
        tasks={this.state.tasks}
        titleChange={(event) => this.titleChangeHandler(event)}
        saveClick={() => this.saveClickHandler()}
        plusClick={(event) => this.plusClickHandler(event)}
        minusClick={(event) => this.minusClickHandler(event)}
        updateClick={() => this.updateClickHandler(id)}
        deleteClick={() => this.deleteClickHandler(id)}
      />
      </main>
      <Footer />
    </div>)
  }
};

export default Layout;