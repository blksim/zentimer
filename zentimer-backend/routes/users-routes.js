const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const usersControllers = require('../controllers/users-controllers');

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

router.get('/logout', () => {});

router.put('/config', () => {});

module.exports = router;