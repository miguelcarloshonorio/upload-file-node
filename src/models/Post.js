const mongoose = require('mongoose');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');
const path = require('path');
const {
  promisify
} = require('util');

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


PostSchema.pre('save', function () {
  if (!this.url) {
    this.url = `${process.env.URL_APP}/files/${this.key}`;
  }
});

PostSchema.pre('remove', function () {
  // removendo do cloud ou local
  if (process.env.NODE_ENV === 'production') {
    return cloudinary.v2.uploader.destroy(this.key);
  } else {
    console.log('deletando ', this.key)
    return promisify(fs.unlink)(path.resolve(__dirname, '..', '..', 'tmp', 'uploads', this.key));
  }
});

module.exports = mongoose.model('Post', PostSchema);