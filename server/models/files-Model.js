const mongoose = require('mongoose');

const fileSchmea = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  fileType: {
    type: String,
    required: true,
  },
  fileSize: {
    type: Number,
    required: true,
  },
  fileContent: {
    type: Buffer,
    required: true,
  },
  ownerId: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
  instructions: {
    type: String,
  },
});

const File = mongoose.model('File', fileSchmea);

module.exports = File;
