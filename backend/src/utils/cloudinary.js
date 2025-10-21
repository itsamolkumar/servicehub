// Minimal Cloudinary helper using cloudinary v1 API
const cloudinary = require('cloudinary').v2;

if (process.env.CLOUDINARY_URL) {
  cloudinary.config({ cloudinary_url: process.env.CLOUDINARY_URL });
}

async function uploadFromBuffer(buffer, folder = 'servicehub') {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder }, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
    stream.end(buffer);
  });
}

module.exports = { uploadFromBuffer };
