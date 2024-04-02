const Comment = require('../models/comments-Model');

const getComment = async (req, res) => {
  const { postId } = req.params;
  try {
    const comment = await Comment.find();
    if (!comment) {
      return res.status(404).json({ msg: 'No Comments found' });
    }
    return res.status(200).json({ comment });
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
};

const postComment = async (req, res) => {
  const { postId } = req.params;
  const commentData = req.body;
  const existingComment = await Comment.findOne({ title: commentData.title });

  if (existingComment) {
    return res.status(400).json({ msg: 'Already present' });
  }
  try {
    const newComment = await Comment.create(commentData);
    return res.status(201).json(newComment);
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ msg: 'Internal Server Error' });
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
    return res.status(500).json({ msg: 'Internal Server Error' });
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
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
};

module.exports = { getComment, postComment, patchComment, deleteComment };
