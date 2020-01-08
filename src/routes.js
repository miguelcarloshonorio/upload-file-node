const routes = require('express').Router();
const multer = require('multer');
const multerConfig = require('./config/multer');
const Post = require('./models/Post');
//custom cloudinary
const cloudinary = require('./config/cloudinary');

routes.get('/', (req, res) => {
  return res.json({
    message: 'API de fotos do Miguel Honório'
  });
});

routes.post('/posts', multer(multerConfig).single('file'), async (req, res) => {
  const {
    originalname: name,
    bytes: size,
    url,
    public_id: key,
    secure_url
  } = req.file;

  const post = await Post.create({
    name,
    key,
    size,
    url,
    secure_url
  });

  return res.json(post);

});

// GET POSTS
routes.get('/posts', async (req, res) => {
  const posts = await Post.find();

  res.json(posts);
});

routes.delete('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.secure_url) {
      await cloudinary.uploader.destroy(post.key, async (error, result) => {
        if (error) {
          res.status(200).json({
            result
          });
        } else {
          res.status(500).json({
            error
          });
        }
      });
    } else {
      // remover em dev
    }

  } catch (error) {
    res.status(500).json({
      error
    });
  }
});

routes.get('/posts/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);

  res.json(post);
});

module.exports = routes;