const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authUser');

router.post('/', login);

module.exports = router;
