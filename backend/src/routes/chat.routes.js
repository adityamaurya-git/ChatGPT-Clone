const express = require('express');
const middleware = require('../middlewares/auth.middleware');
const controller = require('../controllers/chat.controller')
const router = express.Router();


router.post('/' , middleware.authUser , controller.createChat);
router.get('/get' ,middleware.authUser , controller.getChat );

module.exports = router;