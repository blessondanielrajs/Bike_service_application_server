const express = require('express');
const router = express.Router();

const Login = require('./Login');

router.use('/login', Login);

module.exports = router;