const routes = require('express').Router();
const multer = require('multer');
const multerConfig = require('./config/multer');

routes.get('/', (req, res) => {
  return res.json({
    message: 'API do iguel'
  });
});

routes.post('/posts', multer(multerConfig).single('file'), (req, res) => {
  console.log('file uploaded', req.file);

  return res.json({status: 'ok'});
});

module.exports = routes;