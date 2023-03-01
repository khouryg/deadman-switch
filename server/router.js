const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.post('/message', controller.addMessage)

module.exports = router;