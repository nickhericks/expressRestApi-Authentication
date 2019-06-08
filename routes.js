'use strict';

const express = require('express');
const { check, validationResult } = require('express-validator/check');
const bcryptjs = require('bcryptjs');
const auth = require('basic-auth');

// Construct a router instance.
const router = express.Router();

// This array is used to keep track of user records
// as they are created.
const users = [];


const authenticateUser = (req, res, next) => {
  // Parse the user's credentials from the Authorization header.
  const credentials = auth(req);

  // If the user's credentials are available...
  // Attempt to retrieve the user from the data store
  // by their username (i.e. the user's "key"
  // from the Authorization header).
  if (credentials) {
    const user = users.find(u => u.username === credentials.name);

    // If a user was successfully retrieved from the data store...
    // Use the bcryptjs npm package to compare the user's password
    // (from the Authorization header) to the user's password
    // that was retrieved from the data store.
    if (user) {
      const authenticated = bcryptjs
        .compareSync(credentials.pass, user.password);

      // If the passwords match...
      // Then store the retrieved user object on the request object
      // so any middleware functions that follow this middleware function
      // will have access to the user's information.
      if (authenticated) {
        req.currentUser = user;
      }
    }
  }

  // If user authentication failed...
  // Return a response with a 401 Unauthorized HTTP status code.

  // Or if user authentication succeeded...
  // Call the next() method.
  next();
};


router.get('/users', authenticateUser, (req, res) => {
  const user = req.currentUser;

  res.json({
    name: user.name,
    username: user.username,
  });
});


// Route that creates a new user.
router.post('/users', [
  check('name')
    .exists()
    .withMessage('Please provide a value for "name"'),
  check('username')
    .exists()
    .withMessage('Please provide a value for "username"'),
  check('password')
    .exists()
    .withMessage('Please provide a value for "password"'),
], (req, res) => {
  // Attempt to get the validation result from the Request object.
  const errors = validationResult(req);

  // If there are validation errors...
  if (!errors.isEmpty()) {
    // Use the Array `map()` method to get a list of error messages.
    const errorMessages = errors.array().map(error => error.msg);
    // Return the validation errors to the client.
    return res.status(400).json({ errors: errorMessages });
  }
  // Get the user from the request body.
  const user = req.body;

  // Hash the new user's password.
  user.password = bcryptjs.hashSync(user.password);

  // Add the user to the `users` array.
  users.push(user);

  // Set the status to 201 Created and end the response.
  res.status(201).end();
});

module.exports = router;
