const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwtUtil = require('../utils/jwt');

const router = express.Router();

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!email || !password || !name) return res.status(400).json({ message: 'Missing fields' });

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: 'Email already registered' });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash, role: role || 'user' });

    // Send welcome email
    try {
      const nodemailer = require('nodemailer');
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SENDER_EMAIL,
          pass: process.env.SENDER_EMAIL_PASSWORD,
        },
      });
      
      await transporter.sendMail({
        from: process.env.SENDER_EMAIL,
        to: email,
        subject: 'Welcome to ServiceHub!',
        text: `Hi ${name},\n\nWelcome to ServiceHub! We are excited to have you on board.\n\nYou can now book and manage local services easily.\n\nBest regards,\nServiceHub Team`,
      });
    } catch (emailErr) {
      console.error('Failed to send welcome email:', emailErr.message);
      // Continue with signup even if email fails
    }

    const token = jwtUtil.sign({ id: user._id, role: user.role });
    res.json({ token, user: user.toJSON() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Missing fields' });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwtUtil.sign({ id: user._id, role: user.role });
    res.json({ token, user: user.toJSON() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
