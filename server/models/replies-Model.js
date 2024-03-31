const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
  doubtId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doubt',
    required: true,
  },
  body: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: String,
    default: Date.now,
  },
});

const Reply = mongoose.model('Reply', replySchema);

module.exports = Reply;
