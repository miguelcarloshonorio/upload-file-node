const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
// const aar = require('../../temp/uploads');

const path_fo_file = path.resolve('..', '..', 'tmp', 'uploads');

module.exports = {
  dest: path.resolve(path_fo_file),
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, path_fo_file);
    },
    filename: (req, file, callback) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) {
          callback(err);
        }
        const fileName = `${hash.toString('hex')}-${file.originalname}`;

        callback(null, fileName);

      });
    }
  }),
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