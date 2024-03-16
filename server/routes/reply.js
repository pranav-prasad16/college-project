const express = require('express');
const Reply = require('../models/replies-Model');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.use(authMiddleware);

router.get('/', (req, res) => {}).post('/', (req, res) => {});

module.exports = router;
