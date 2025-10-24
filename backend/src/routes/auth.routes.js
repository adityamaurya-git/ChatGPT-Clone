const express = require('express');
const controller = require('../controllers/auth.controller')
const router = express.Router();



router.post('/register' , controller.registerUser);
router.post('/login' , controller.loginUser);
router.get('/logout' , controller.logoutUser);
router.get('/current-user' , controller.currentUser);


module.exports = router;