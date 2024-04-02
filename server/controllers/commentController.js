const Comment = require('../models/comments-Model');

const getComment = async (req, res) => {
  const { postId } = req.params;
  try {
    const comments = await Comment.find({ postId });
    if (!comments) {
      return res.status(404).json({ msg: 'No Comments found' });
    }
    return res.status(200).json(comments);
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ msg: 'Failed to fetch comments' });
  }
};

const postComment = async (req, res) => {
  const { postId } = req.params;
  const { body, userId } = req.body;
  const createdAt = Date.now();
  try {
    const newComment = new Comment({ body, userId, postId, createdAt });
    await newComment.save();
    return res.status(201).json(newComment);
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ msg: 'Failed to add comment' });
  }
};

const patchComment = async (req, res) => {
  const { postId, commentId } = req.params;
  const commentData = req.body;
  try {
    const patchComment = await Comment.findByIdAndUpdate(
      commentId,
      commentData,
      {
        new: true,
      }
    );
    if (!patchComment) {
      return res.status(404).json({ msg: 'Comment not found' });
    }
    return res.status(201).json({ msg: 'Comment patched successfully' });
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ msg: 'Failed to update comment' });
  }
};

const deleteComment = async (req, res) => {
  const { postId, commentId } = req.params;
  try {
    const deleteComment = await Comment.findByIdAndDelete(commentId);
    if (!deleteComment) {
      return res.status(404).json({ msg: 'Comment not found' });
    }
    return res.status(201).json({ msg: 'Deleted comment successfully' });
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ msg: 'Failed to delete comment' });
  }
};

module.exports = { getComment, postComment, patchComment, deleteComment };
