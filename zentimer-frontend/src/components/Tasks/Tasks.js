import React, { useState, useEffect } from 'react';

import classes from './Tasks.module.css';
import Task from './Task/Task';
import axios from '../../shared/axios';

const Tasks = (props) => {
  const [title] = useState('');
  const [count, setCount] = useState(0);
  const [tasks, setTasks] = useState([...props.tasks]);
  const maximum = (24 * 60) / (props.focusDuration + props.breakDuration);

  useEffect(() => {
    setTasks(props.tasks)
  }, [props.tasks]);

  const titleChangeHandler = (event, id) => {
    const input = event.target.value;
    if (input && id) {
      const tasks = props.tasks;
      tasks.map((task) => {
        if (id === task.id) task.title = input;
        return tasks;
      });
      setTasks(tasks);
    }
  };

  const minusClickHandler = (id) => {
    if (!id) {
      count <= 0 ? setCount(0) : setCount(count - 1);
    } else {
      tasks.map((task) => {
        if (task.id === id) {
          task.count = task.count - 1;
          if (task.count <= 0) {
            task.count = 0
          } 
        }
        return tasks;
      });
     setTasks(tasks);
    }
  };

  const plusClickHandler = (id) => {
    if (!id) {
      count >= maximum ? setCount(maximum) : setCount(count + 1);
    } else {
      tasks.map((task) => {
        if (task.id === id) {
          task.count = task.count + 1;
          if (task.count >= maximum) {
            task.count = maximum
          } 
        }
        return tasks;
      });
     setTasks(tasks);
    }
  }
 
  const saveClickHandler = () => {
    axios.post('/tasks.json', {
      title: title,
      count: count
    })
    .then((res) => {
      setTasks([ ...tasks, {id: res.data.name, title: title, count: count}]);
    })
    .catch((err) => {
      console.log('err');
    })
  };

  const updateClickHandler = (id) => {
    const task = tasks.filter((task) => task.id === id);
    axios.put('/tasks/' + id +'.json', task[0])
    .then((res) => {
    })
    .catch((err) => {
      console.log(err);
    });
  };

  const deleteClickHandler = (id) => {
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

  return (
    <section className={classes.Tasks}>
      <ul className={classes.TaskItems}>
        <Task 
          type='new'
          title={(event) => titleChangeHandler(event)}
          minus={() => minusClickHandler()}
          plus={() =>  plusClickHandler()}
          value={count}
          save={() => saveClickHandler()}
        />
        <div className={classes.Divider}></div>
      { tasks.map((task) => {
        const id = task.id;
        return (<Task 
          key={task.id} 
          title={task.title} 
          value={task.count} 
          minus={() => minusClickHandler(id)} 
          plus={() => plusClickHandler(id)}
          update={() => updateClickHandler(id)}
          change={(event) => titleChangeHandler(event, id)}
          delete={() => deleteClickHandler(id)}
        />)})
      }
      </ul>
      <a href="#" className={classes.Import}>Import from...</a>
    </section>
  );
};

export default Tasks;