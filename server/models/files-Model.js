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
    type: String,
    required: true,
  },
  fileContent: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: String,
    default: Date.now,
  },
  instructions: {
    type: String,
  },
});

const File = mongoose.model('file', fileSchmea);

module.exports = File;
