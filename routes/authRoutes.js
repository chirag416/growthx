const express = require('express');
const { register, login } = require('../controllers/authController');

const router = express.Router();

// User routes
router.post('/user/register', register);
router.post('/user/login', login);

// Admin routes
router.post('/admin/register', register);
router.post('/admin/login', login);

module.exports = router;