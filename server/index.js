const express = require('express');
require('dotenv').config();
const app = express();
const router = require('./router.js');
const db = require('./db.js');
const morgan = require('morgan')

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());
app.use(morgan('tiny'))
app.use('/', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})