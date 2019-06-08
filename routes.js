'use strict';

const express = require('express');
const { check, validationResult } = require('express-validator/check');
// Construct a router instance.
const router = express.Router();

// This array is used to keep track of user records
// as they are created.
const users = [];


// Route that creates a new user.
router.post('/users', (req, res) => {
  // Get the user from the request body.
  const user = req.body;

  // Add the user to the `users` array.
  users.push(user);

  // Set the status to 201 Created and end the response.
  res.status(201).end();
});

module.exports = router;
