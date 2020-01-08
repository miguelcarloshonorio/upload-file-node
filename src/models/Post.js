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


PostSchema.pre('save', function(){
  if(!this.url){
    this.url = `${process.env.URL_APP}/files/${this.key}`;
  }
});

module.exports = mongoose.model('Post', PostSchema);