const express = require('express');
const Booking = require('../models/Booking');
const Service = require('../models/Service');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

const mailer = require('../utils/mailer');

// Create booking (user)
router.post('/', authenticate, authorize('user'), async (req, res) => {
  try {
    const { serviceId, preferredDate, preferredTime } = req.body;
    const service = await Service.findById(serviceId);
    if (!service) return res.status(404).json({ message: 'Service not found' });

    const booking = await Booking.create({
      service: service._id,
      user: req.user._id,
      provider: service.provider,
      preferredDate: preferredDate ? new Date(preferredDate) : undefined,
      preferredTime,
      price: service.price
    });

    // Send booking confirmation email
    try {
      await mailer.sendBookingConfirmation({
        to: req.user.email,
        name: req.user.name,
        service: service.title,
        date: preferredDate,
        time: preferredTime
      });
    } catch (mailErr) {
      console.error('Email error:', mailErr.message);
    }

    res.status(201).json({ booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get bookings for current user (all roles)
router.get('/me', authenticate, async (req, res) => {
  try {
    let filter = {};
    if (req.user.role === 'user') filter.user = req.user._id;
    else if (req.user.role === 'provider') filter.provider = req.user._id;

    const bookings = await Booking.find(filter).populate('service').populate('user', 'name email');
    res.json({ bookings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Provider accept/reject booking
router.post('/:id/decide', authenticate, authorize('provider'), async (req, res) => {
  try {
    const { action } = req.body; // 'accept'|'reject'|'complete'|'cancel'
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Not found' });
    if (String(booking.provider) !== String(req.user._id)) return res.status(403).json({ message: 'Forbidden' });

    if (action === 'accept') booking.status = 'accepted';
    else if (action === 'reject') booking.status = 'rejected';
    else if (action === 'complete') booking.status = 'completed';
    else if (action === 'cancel') booking.status = 'cancelled';

    await booking.save();
    res.json({ booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// User cancel own booking
router.post('/:id/cancel', authenticate, authorize('user'), async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Not found' });
    if (String(booking.user) !== String(req.user._id)) return res.status(403).json({ message: 'Forbidden' });

    booking.status = 'cancelled';
    await booking.save();
    res.json({ booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
