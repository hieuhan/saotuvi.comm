const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { check, validationResult } = require('express-validator');


router.get('/login', authController.login);
router.post('/login', [
    check('username', 'Vui lòng nhập tên truy cập.')
    .not().isEmpty(),
    check('password', 'Vui lòng nhập mật khẩu.')
    .not().isEmpty()
], authController.postLogin);
router.get('/logout', authController.logout);

module.exports = router;