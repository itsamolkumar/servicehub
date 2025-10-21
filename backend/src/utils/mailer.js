const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp-brevo.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

async function sendBookingConfirmation({ to, name, service, date, time }) {
  const mailOptions = {
    from: process.env.SENDER_EMAIL || process.env.GMAIL_USER,
    to,
    subject: `Booking Confirmed: ${service}`,
    html: `<h2>Booking Confirmed</h2><p>Hi ${name},<br>Your booking for <b>${service}</b> is confirmed.<br>Date: ${date}<br>Time: ${time}</p>`
  };
  return transporter.sendMail(mailOptions);
}

module.exports = { sendBookingConfirmation };
// OTP email
async function sendOtp({ to, code, purpose }) {
  const mailOptions = {
    from: process.env.SENDER_EMAIL || process.env.GMAIL_USER,
    to,
    subject: `Your OTP for ${purpose === 'verify' ? 'Email Verification' : 'Password Reset'}`,
    html: `<h2>OTP Code</h2><p>Your OTP for ${purpose} is: <b>${code}</b><br>This code is valid for 10 minutes.</p>`
  };
  return transporter.sendMail(mailOptions);
}

module.exports.sendOtp = sendOtp;
