const express = require('express');
const router = express.Router();
const { body, check } = require('express-validator');
const usersControllers = require('../controllers/users-controllers');
const bcrypt = require('bcryptjs');

router.get('/fetch', usersControllers.fetch);

router.post('/login', 
  [
    body('email').isEmail(), 
    body('password').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/)
  ], usersControllers.login);

router.post('/signup', 
[
  body('email').isEmail(), 
  body('password').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/)
], usersControllers.signup);

router.post('/config',
[
  body('data.focus').isNumeric(),
  body('data.break').isNumeric(),
  body('data.long break').isNumeric(),
  body('data.long break delay').isNumeric(),
  body('data.notification sound').isString(),
  body('data.let me know before 1 minute').isBoolean(),
  body('data.autopilot mode').isBoolean(),
  body('data.log distraction').isBoolean()
], usersControllers.saveConfig);

module.exports = router;