const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// POST /contact
router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // Configure transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_EMAIL_PASSWORD,
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: 'amolkumar670@gmail.com',
      subject: `[ServiceHub Contact] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'Message sent successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to send message.', error: err.message });
  }
});

module.exports = router;
