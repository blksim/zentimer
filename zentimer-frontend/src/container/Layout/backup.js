/* 
import { GoogleLogout } from 'react-google-login';
import { GOOGLE_CLIENT_ID } from '../../shared/clientId';

const googleLogout = () => {
  return <GoogleLogout
    clientId={GOOGLE_CLIENT_ID}
    buttonText="Logout"
    onLogoutSuccess={() => {
      localStorage.removeItem('token');
      navigate('/');
    }}
    render={renderProps => 
    <a 
      className={classes.NavigationLink} 
      onClick={renderProps.onClick} 
      disabled={renderProps.disabled}>logout</a>}
  />;
};

// const basicLogout = () => {
//   localStorage.removeItem('token');
// }
countdown = () => {
  let min = this.state.config.focus;
  let sec = 60;

  if (!this.state.isInit) {
    min = this.state.minutesLeft;
    sec = this.state.secondsLeft;
  }

  intervalId = setInterval(() => {
    if (min === 0 && sec === 0) {
      clearInterval(intervalId);
      this.setState({
        isStarted: false,
        isStopped: true,
        isFinished: true,
        streakLeft: this.state.streakLeft - 1,
        streakFinished: this.state.streakFinished + 1
      });
    }
    if (sec === 0) {
      sec = 60;
      min--;
    }
    sec--;
    this.setState({ minutesLeft: min, secondsLeft: sec });
  }, 1000);
};

timerHandler = (event) => {
  const button = event.target.textContent;
  switch (button) {
    case 'start':
      this.setState({
        isStarted: true,
        isStopped: false,
        isSkipped: false,
        isInit: false
      });
      this.countdown();
      break;
  
    case 'stop': 
      this.setState({
        isStarted: false,
        isStopped: true,
        isInit: false
      });
      clearInterval(intervalId);
      break;

    case 'skip':
      this.setState({
        isStarted: false,
        isStopped: true,
        isSkipped: true,
        isInit: true,
        streakLeft: this.state.streakLeft - 1 < 0 ? 0 : this.state.streakLeft,
        minutesLeft: this.state.config.focus,
        secondsLeft: 0
      });
      clearInterval(intervalId);
      break;

    default:
      break;
  }
}

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
}

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
  const maximum = (24 * 60) / (this.state.config.focus + this.state.config.break);
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

updateClickHandler = (id) => {
const task = tasks.filter((task) => task.id === id);
axios.put('/tasks/' + id +'.json', task[0])
.then((res) => {
})
.catch((err) => {
  console.log(err);
});
};

deleteClickHandler = (id) => {
axios.delete('/tasks/' + id +'.json')
.then((res) => {
  const tasks = [ ...props.tasks ];
  const updated = tasks.filter(task => { return task.id !== id });
  setTasks(updated);
})
.catch((err) => {
  console.log('err');
});
};
 googleLoginSuccess = (res) => {
    localStorage.setItem('token', res.tokenId);
    refreshTokenSetup(res);
    this.setState({ isAuthenticated : true });
    navigate('/');
};

 googleLoginFailure = (res) => {
    alert('[Login failed] res:', res);
};

logoutHandler = () => {
  console.log('logout clicked');
  localStorage.removeItem('token');
  this.setState({ isAuthenticated: false });
}

submitHandler = (event) => {
  event.preventDefault();
  axios.post(`http://localhost:3001/${this.state.modal.toLowerCase()}`, {
    email: this.state.auth.email.value,
    password: this.state.auth.password.value
  })
  .then(res => {
    if (res.status === 200) {
      localStorage.setItem('token', res.data.id);
      this.setState({ isAuthenticated: true });
      navigate('/tasks');
    }
  })
  .catch(err => {
    console.log(err);
  });
}

componentDidUpdate() {
  console.log('Layout - componentDidUpdate');

};

componentDidMount() {
  console.log('Layout - componentDidMount');
  if (localStorage.getItem('token') !== undefined) {
    this.setState({ isAuthenticated: true });
  } else {
    this.setState({ isAuthenticated: false });
  }

  if (this.state.isAuthenticated) {
    console.log('fetch...');
    axios.get('http://localhost:3001/fetch', {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    })
    .then(res => {
      console.log('Layout - ', res);
      this.setState({ ...this.state, 
        config: {
          focus: res.data.focus,
          break: res.data.break,
          ['long break']: res.data['long break'],
          ['long break delay']: res.data['long break delay'],
          ['notification sound']: res.data['notification sound'],
          ['let me know before 1 minute']: res.data['let me know before 1 minute'],
          ['autopilot mode']: res.data['autopilot mode'],
          ['log distraction']: res.data['log distraction']
        }
      })
    })
  }

  // axios.get('http://localhost:3001/tasks', {
  //   Authorization: `Bearer ${localStorage.getItem('token')}`
  // })
  // .then(res => {
  //   console.log('Layout - request succeed');
  //   console.log(res.data);
  // })
  // .catch(err => {
  //   console.log(err);
  // });

  if (this.state.isInit) {
    this.setState({ minutesLeft: this.state.config.focus, secondsLeft: 0 });
  }
};

componentWillUnmount() {
  console.log('Layout - componentWillUnmount');
}
 */