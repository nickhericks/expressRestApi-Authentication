'use strict';

const express = require('express');
const { check, validationResult } = require('express-validator/check');
// Construct a router instance.
const router = express.Router();

// This array is used to keep track of user records
// as they are created.
const users = [];


const nameValidator = check('name')
	.exists({ checkNull: true, checkFalsy: true })
	.withMessage('Please provide a value for "name"');


// Route that creates a new user.
router.post('/users', nameValidator, (req, res) => {

  // Attempt to get the validation result from the Request object.
	const errors = validationResults(req);
	if(!errors.isEmpty()) {
		const errorMessages = errors.array().map(error => error.msg;

		return res.status(400).json({ errors: errorMesssages })
	}

  // Get the user from the request body.
  const user = req.body;

  // Add the user to the `users` array.
  users.push(user);

  // Set the status to 201 Created and end the response.
  res.status(201).end();
});

module.exports = router;
