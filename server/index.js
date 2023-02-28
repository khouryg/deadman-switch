const express = require('express');
require('dotenv').config();
const app = express();

app.use(express.static(__dirname + '/../client/dist'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})