const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const authJwt = require('../middlewares/authJwt');

router.get('/login', authController.login);
router.get('/profile', authJwt.verifyToken, authController.profile);

module.exports = router;