const mongoose = require('mongoose');

const doubtSchema = new mongoose.Schema({
  title: {
    type: String,
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

const Doubt = mongoose.model('doubt', doubtSchema);

module.exports = Doubt;
