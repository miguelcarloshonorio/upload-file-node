const express = require('express');
const morgan = require('morgan');
const app = express();
const router = require('./routes');

app.use(router);
app.use(express.urlencoded({
  extended: true
}));

// por enquanto dev, depois melhora
app.use(morgan('dev'));

const port = process.env.PORT | 3000;
app.listen(port, () => {
  console.log(`Server Up on port ${port}`);
});