const express = require('express');
const app = express();
const port = 3001;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000")
  res.header("Access-Control-Allow-Headers", "Origin, X-requested-With, Content-Type, Accept");
  next();
})

app.get('/', (req, res) => {
  res.send('Hello world!')
});

app.post('/signup', (req, res) => {
  console.log('it works');
  res.send(req.body);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});