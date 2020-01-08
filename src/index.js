require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();
const router = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors');

//**
// database setup
//

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  // just after connect on mongo
  if (err) {
    console.log('Error on connect database');
    throw err;
  } else {
    initServer();
  }
});

initServer = () => {
  // por enquanto dev, depois melhora
  midlewares();
  app.use(express.urlencoded({
    extended: true
  }));

  const port = process.env.PORT | 3000;
  app.listen(port, (error) => {
    if(error){
      console.log(`Error on up server: ${error}`);
    }
    console.log(`Server Up on port ${port}`);
  });
};

midlewares = () => {
  app.use(morgan('combined'));
  app.use(router);
  // app.use(cors());
}