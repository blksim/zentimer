const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../util/mongo');

const login = async (req, res) => {
 let token;
 const errors = await validationResult(req);
 if (!errors.isEmpty()) {
   return res.status(400).json({ errors: errors.array() });
 }

 const input = req.body.password.trim();
 const found = await db.findUserByEmail(req.body.email.trim());
 if (found && await bcrypt.compare(input, found.password)) {
   try {
     token = jwt.sign({ email: found.email }, 'supersecret_dont_share', { expiresIn: '1h' });
   } catch (err) {
     console.log(err);
   }
 } else {
   return res.status(400).json('email or password is not matched')
 }
  res.json({ message: 'success', id: token });
}

const signup = async (req, res) => {
  let token;
  const errors = await validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  if (db.findUserByEmail(req.body.email) !== null) {
    res.status(400).json({ message: 'email already exists'});
  } else {
    const hashed = await bcrypt.hash(req.body.password.trim(), 12);
    db.addUser({ email: req.body.email, password: hashed });
    try {
      token = await jwt.sign({ email: req.body.email }, 'supersecret_dont_share', { expiresIn: '1h'});
    } catch (error) {
    console.log(error);     
    }
    res.json({ message: 'success', id: token });
  }
}

exports.login = login;
exports.signup = signup;