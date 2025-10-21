const Otp = require('../models/Otp');
const mailer = require('./mailer');

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendOtpEmail({ email, purpose }) {
  const code = generateOtp();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min
  await Otp.create({ email, code, purpose, expiresAt });
  await mailer.sendOtp({ to: email, code, purpose });
  return code;
}

async function verifyOtp({ email, code, purpose }) {
  const otp = await Otp.findOne({ email, code, purpose, used: false });
  if (!otp || otp.expiresAt < new Date()) return false;
  otp.used = true;
  await otp.save();
  return true;
}

module.exports = { sendOtpEmail, verifyOtp };
