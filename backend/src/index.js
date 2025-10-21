require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: Date.now() });
});

app.get('/', (req, res) => {
  res.send('ServiceHub Backend — running');
});

// Routes
const authRoutes = require('./routes/auth');
const { authenticate } = require('./middleware/auth');
const servicesRoutes = require('./routes/services');
const bookingsRoutes = require('./routes/bookings');
const adminRoutes = require('./routes/admin');
const reviewsRoutes = require('./routes/reviews');
const uploadRoutes = require('./routes/upload');
const contactRoutes = require('./routes/contact');
const otpRoutes = require('./routes/otp');

app.use('/auth', authRoutes);
app.use('/services', servicesRoutes);
app.use('/bookings', bookingsRoutes);
app.use('/admin', adminRoutes);
app.use('/reviews', reviewsRoutes);
app.use('/upload', uploadRoutes);
app.use('/contact', contactRoutes);
app.use('/otp', otpRoutes);

// Protected test route
app.get('/me', authenticate, (req, res) => {
  res.json({ user: req.user.toJSON() });
});

// ✅ Connect to MongoDB and start server once
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/servicehub')
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });
