const express = require('express');
const Review = require('../models/Review');
const Service = require('../models/Service');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

// Add review (user only)
router.post('/', authenticate, authorize('user'), async (req, res) => {
  try {
    const { serviceId, rating, text } = req.body;
    const service = await Service.findById(serviceId);
    if (!service) return res.status(404).json({ message: 'Service not found' });

    const review = await Review.create({ service: service._id, user: req.user._id, rating, text });

    // update service rating
    const agg = await Review.aggregate([
      { $match: { service: service._id } },
      { $group: { _id: '$service', avg: { $avg: '$rating' }, count: { $sum: 1 } } }
    ]);
    if (agg[0]) {
      service.ratingAvg = agg[0].avg;
      service.ratingCount = agg[0].count;
      await service.save();
    }

    res.status(201).json({ review });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete review (admin)
router.delete('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Not found' });
    await review.remove();
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
