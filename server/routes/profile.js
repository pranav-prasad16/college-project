const express = require('express');
const { profile } = require('../controllers/profileController');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.use(authMiddleware);

router.get('/', profile);

module.exports = router;
