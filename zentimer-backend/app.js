const express = require('express');

const usersRoutes = require('./routes/users-routes');
const tasksRoutes = require('./routes/tasks-routes');

const app = express();
const port = 3001;

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000")
  res.header("Access-Control-Allow-Headers", "Origin, X-requested-With, Content-Type, Accept");
  next();
});

app.use(usersRoutes);
app.use(tasksRoutes);


app.listen(port);