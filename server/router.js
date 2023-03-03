const express = require('express');
const path = require('path');
const router = express.Router();
const controller = require('./controller');


router.post('/addmessage', controller.addMessage);
router.get('/getmessage/:id', controller.getMessage);
router.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  });
});

module.exports = router;