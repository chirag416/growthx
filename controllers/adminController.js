const Assignment = require('../models/Assignment');

// Fetch assignments
const getAssignments = async (req, res) => {
  const assignments = await Assignment.find({ adminId: req.user.id })
    .populate('userId', 'name email')
    .sort({ createdAt: -1 });
  res.json(assignments);
};

// Accept assignment
const acceptAssignment = async (req, res) => {
  const assignment = await Assignment.findById(req.params.id);

  if (assignment && assignment.adminId.toString() === req.user.id) {
    assignment.status = 'accepted';
    await assignment.save();
    res.json({ message: 'Assignment accepted' });
  } else {
    res.status(404).json({ message: 'Assignment not found' });
  }
};

// Reject assignment
const rejectAssignment = async (req, res) => {
  const assignment = await Assignment.findById(req.params.id);

  if (assignment && assignment.adminId.toString() === req.user.id) {
    assignment.status = 'rejected';
    await assignment.save();
    res.json({ message: 'Assignment rejected' });
  } else {
    res.status(404).json({ message: 'Assignment not found' });
  }
};

module.exports = { getAssignments, acceptAssignment, rejectAssignment };
