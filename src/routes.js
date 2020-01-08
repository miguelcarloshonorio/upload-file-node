const routes = require('express').Router();
const multer = require('multer');
const multerConfig = require('./config/multer');
const Post = require('./models/Post');

routes.get('/', (req, res) => {
  return res.json({
    message: 'API de fotos do Miguel Honório'
  });
});

routes.post('/posts', multer(multerConfig).single('file'), async(req, res) =>  {
  const {originalname: name, bytes:size, url, public_id:key, secure_url } = req.file;
  
  const post = await Post.create({
    name,
    key,
    size,
    url,
    secure_url
  });

  return res.json(post);

});

module.exports = routes;