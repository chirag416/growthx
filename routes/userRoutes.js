const express = require('express');
const { fetchAdmins, uploadAssignment } = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/admins', protect, fetchAdmins);
router.post('/upload', protect, uploadAssignment);

module.exports = router;
