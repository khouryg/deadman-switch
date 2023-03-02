const express = require('express');
const path = require('path');
const router = express.Router();
const controller = require('./controller');

router.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})
router.post('/message', controller.addMessage)

module.exports = router;