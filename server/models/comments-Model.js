const mongoose = require('mongoose');

const commmentSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Number,
    required: true,
    default: Date.now,
  },
});

const Comment = mongoose.model('Comment', commmentSchema);

module.exports = Comment;
