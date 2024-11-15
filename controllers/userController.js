const Assignment = require('../models/Assignment');
const User = require('../models/User');

// Fetch all admins
const fetchAdmins = async (req, res) => {
  const admins = await User.find({ role: 'admin' }).select('name email');
  res.json(admins);
};

// Upload assignment
const uploadAssignment = async (req, res) => {
  const { task, adminId } = req.body;

  const assignment = await Assignment.create({
    userId: req.user.id,
    task,
    adminId,
  });

  res.status(201).json(assignment);
};

module.exports = { fetchAdmins, uploadAssignment };
