const express = require('express');
const Service = require('../models/Service');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

// List services with simple filters: q, category, minPrice, maxPrice
router.get('/', async (req, res) => {
  try {
    const { q, category, minPrice, maxPrice, provider } = req.query;
    const filter = {};
    if (q) filter.title = { $regex: q, $options: 'i' };
    if (category) filter.category = category;
    if (provider) filter.provider = provider;
    if (minPrice || maxPrice) filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);

    const services = await Service.find(filter).populate('provider', 'name email');
    res.json({ services });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get service details
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate('provider', 'name email');
    if (!service) return res.status(404).json({ message: 'Not found' });
    res.json({ service });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create service (provider only)
router.post('/', authenticate, authorize('provider'), async (req, res) => {
  try {
    const { title, description, category, price, images } = req.body;
    const service = await Service.create({ provider: req.user._id, title, description, category, price, images });
    res.status(201).json({ service });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Edit service (provider owner or admin)
router.put('/:id', authenticate, async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: 'Not found' });
    if (req.user.role !== 'admin' && String(service.provider) !== String(req.user._id))
      return res.status(403).json({ message: 'Forbidden' });

    const updates = ['title', 'description', 'category', 'price', 'images'];
    updates.forEach((k) => { if (req.body[k] !== undefined) service[k] = req.body[k]; });
    await service.save();
    res.json({ service });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete service
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: 'Not found' });
    if (req.user.role !== 'admin' && String(service.provider) !== String(req.user._id))
      return res.status(403).json({ message: 'Forbidden' });

    await service.remove();
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
