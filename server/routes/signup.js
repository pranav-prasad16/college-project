const express = require('express');
const router = express.Router();
const { signup } = require('../controllers/createUser');

router.post('/', signup);

module.exports = router;
