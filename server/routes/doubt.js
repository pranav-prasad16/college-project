const express = require('express');
const {
  getDoubt,
  postDoubt,
  patchDoubt,
  deleteDoubt,
} = require('../controllers/doubtController');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.use(authMiddleware);

router
  .get('/', getDoubt)
  .post('/', postDoubt)
  .patch('/:doubtId', patchDoubt)
  .delete('/:doubtId', deleteDoubt);

module.exports = router;
