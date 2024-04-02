const express = require('express');
const {
  getComment,
  postComment,
  patchComment,
  deleteComment,
} = require('../controllers/commentController');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.use(authMiddleware);

router
  .get('/posts/:postId/comments', getComment)
  .post('/posts/:postId/comments', postComment)
  .patch('/posts/:postId/comments/:commentId', patchComment)
  .delete('/posts/:postId/comments/:commentId', deleteComment);

module.exports = router;
