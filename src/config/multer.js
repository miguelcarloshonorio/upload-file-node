require('dotenv').config();
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');

cloudinary.config({
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
  cloud_name: process.env.cloud_name
});

const storageTypes = {
  local: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, path_fo_file);
    },
    filename: (req, file, callback) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) {
          callback(err);
        }
        file.public_id = `${hash.toString('hex')}-${file.originalname}`;
        file.url = '';
        file.secure_url = '';

        callback(null, file.originalname);

      });
    }
  }),
  cloud: cloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'images',
    // transformation: {
    //   width: 200,
    //   height: 150,
    //   crop: 'fit',
    //   format: 'jpg'
    // }
  })
};

const path_fo_file = path.resolve(__dirname, '..', '..', 'tmp', 'uploads');

module.exports = {
  dest: path.resolve(path_fo_file),
  storage: uploadEnvirontment(),
  // storage: storageTypes.cloud,
  limits: {
    fileSize: 2 * 1024 * 1024,
    fileFilter: (req, file, callback) => {
      const allowedMimes = [
        'images/jpeg',
        'images/pjpeg',
        'images/png',
        'images/gif',
      ];

      if (allowedMimes.includes(file.mimetype)) {
        callback(null, true);
      } else {
        callback(new Error('Invalid File Type'));
      }
    }
  }
};

function uploadEnvirontment() {
  return process.env.NODE_ENV === 'production' ? storageTypes.cloud : storageTypes.local;
}