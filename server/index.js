const express = require('express');
require('dotenv').config();
const app = express();
const router = require('./router.js');
const db = require('./db.js')

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());
app.use('/', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})