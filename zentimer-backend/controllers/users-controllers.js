const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../util/mongo');
const sgMail = require('@sendgrid/mail');

const apiKey = process.env.SENDGRID_API_KEY;
 sgMail.setApiKey(apiKey);
 sgMail.setSubstitutionWrappers('{{', '}}');

const login = async (req, res) => {
 let token;
 const errors = await validationResult(req);
 if (!errors.isEmpty()) {
   console.log('error');
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
   return res.status(200).json({ token: token });
 } else {
   console.log('err: invalid credential');
   return res.status(400).send({ error: 'Invalid email or password' });
 }
}

const signup = async (req, res) => {
  let token;
  const errors = await validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const hasFound = await db.findUserByEmail(req.body.email);
  if (hasFound) {
    return res.status(400).json({ error: 'Email already exists. Forgot password?'});
  } else {
    const hashed = await bcrypt.hash(req.body.password.trim(), 12);
    db.addUser({ email: req.body.email, password: hashed });
    try {
      token = await jwt.sign({ email: req.body.email }, 'supersecret_dont_share', { expiresIn: '1h'});
      await sendMail(token);
    } catch (error) {
      console.log(error);     
    }
    return res.status(200).json({ message: 'Please check out your email inbox' });
  }
}

const sendMail = async (token) => {
  const msg = {
    to: 'blakesim3@gmail.com',
    from: 'blakesim3@gmail.com',
    subject: 'Wellcome to zentimer',
    template_id: 'd-7f2688c156f7460085fe9a598711fd44',
    dynamic_template_data: { link: 'http://localhost:3000/r/' + token }
  };

  sgMail.send(msg)
    .then(res => {
      console.log('email sent');
    })
    .catch(err => {
      console.log(err);
    })
};

const fetch = async (req, res) => {
  const found = await db.findUserByEmail('testuser2@gmail.com');
  console.log(found);
  res.json(found);
};

const saveConfig = async (req, res) => {
  const errors = await validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  db.saveConfig(req.body.data)
  res.json({ message: 'success' })
};

exports.login = login;
exports.signup = signup;
exports.fetch = fetch;
exports.saveConfig = saveConfig;