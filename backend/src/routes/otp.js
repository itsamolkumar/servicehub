const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const otpUtil = require('../utils/otp');

const router = express.Router();

// Request OTP for email verification or password reset
router.post('/request', async (req, res) => {
  try {
    const { email, purpose } = req.body;
    if (!email || !['verify', 'reset'].includes(purpose)) return res.status(400).json({ message: 'Invalid request' });
    await otpUtil.sendOtpEmail({ email, purpose });
    res.json({ message: 'OTP sent' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Verify OTP
router.post('/verify', async (req, res) => {
  try {
    const { email, code, purpose } = req.body;
    const ok = await otpUtil.verifyOtp({ email, code, purpose });
    if (!ok) return res.status(400).json({ message: 'Invalid or expired OTP' });
    res.json({ message: 'OTP verified' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Reset password using OTP
router.post('/reset', async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;
    const ok = await otpUtil.verifyOtp({ email, code, purpose: 'reset' });
    if (!ok) return res.status(400).json({ message: 'Invalid or expired OTP' });
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.passwordHash = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ message: 'Password reset successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
