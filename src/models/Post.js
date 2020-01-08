const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  name: String, 
  size: Number,
  key: String,
  url: String,
  secure_url: String,
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Post', PostSchema);