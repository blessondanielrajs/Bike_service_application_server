const express = require('express');
const router = express.Router();

const Login = require('./Login');
const Customer = require('./Customer');
const Owner = require('./Owner');


router.use('/login', Login);
router.use('/customer', Customer);
router.use('/owner', Owner );
module.exports = router;