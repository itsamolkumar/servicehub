const express = require('express');
const multer = require('multer');
const { authenticate, authorize } = require('../middleware/auth');
const cloud = require('../utils/cloudinary');

const router = express.Router();
const upload = multer(); // memory storage

router.post('/image', authenticate, authorize('provider'), upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file' });
    const result = await cloud.uploadFromBuffer(req.file.buffer, 'servicehub');
    res.json({ url: result.secure_url, raw: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Upload error' });
  }
});

module.exports = router;
