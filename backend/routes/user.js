const express = require('express');
const router = express.Router();
const { getUserProfile } = require('../controller/user');
const { checkUserAuthorization } = require('../middlewares/logger');

router.get('/profile', checkUserAuthorization, getUserProfile);

module.exports = router;
