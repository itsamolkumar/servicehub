const express = require('express');
const User = require('../models/User');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

// Get all users/providers
router.get('/users', authenticate, authorize('admin'), async (req, res) => {
  const users = await User.find().select('-passwordHash');
  res.json({ users });
});

// Approve provider account
router.post('/providers/:id/approve', authenticate, authorize('admin'), async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'Not found' });
  if (user.role !== 'provider') return res.status(400).json({ message: 'User is not a provider' });

  user.isApproved = true;
  await user.save();
  res.json({ user });
});

module.exports = router;
