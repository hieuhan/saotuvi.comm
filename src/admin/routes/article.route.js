const express = require('express');
const router = express.Router();
const articleController = require('../controllers/article.controller');

router.get('/', articleController.index);

router.get('/create', articleController.create);

module.exports = router;