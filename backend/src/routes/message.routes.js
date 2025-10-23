const express = require('express');
const router = express.Router();

const controller = require('../controllers/message.controller');

// GET
router.get('/:chatId',controller.getMessages);

module.exports = router;