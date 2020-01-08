const cloudinary = require('cloudinary');
const cloudnaryconfig = require('./cloudnaryconfig');
cloudinary.config(cloudnaryconfig);

module.exports = cloudinary;
 