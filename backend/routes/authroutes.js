const express = require('express');
const router = express.Router();
const { registerEmployee, loginEmployee } = require('../controller/auth/empAuth');

// Route for employee registration
router.post('/register', registerEmployee);

// Route for employee login
router.post('/login', loginEmployee);

module.exports = router;
