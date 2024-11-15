const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register user or admin
const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  // Determine the required role based on the route
  const requiredRole = req.originalUrl.includes('/admin/register') ? 'admin' : 'user';

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Enforce role matching for the route
  if (role !== requiredRole) {
    return res.status(403).json({
      message: `Access denied. You can only register as a ${requiredRole}.`,
    });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({ name, email, password: hashedPassword, role });
  if (user) {
    res.status(201).json({ message: `${requiredRole.charAt(0).toUpperCase() + requiredRole.slice(1)} registered successfully` });
  } else {
    res.status(400).json({ message: 'Invalid registration data' });
  }
};

// Login user or admin
const login = async (req, res) => {
  const { email, password } = req.body;

  // Determine the required role based on the route
  const requiredRole = req.originalUrl.includes('/admin/login') ? 'admin' : 'user';

  const user = await User.findOne({ email });
  if (user && user.role === requiredRole && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
  } else {
    res.status(401).json({ message: 'Invalid email, password, or access route' });
  }
};

module.exports = { register, login };
