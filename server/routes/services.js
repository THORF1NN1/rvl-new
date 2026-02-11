const express = require('express');
const Service = require('../models/Service');
const { auth, adminOnly } = require('../middleware/auth');
const router = express.Router();

// GET /api/services — public
router.get('/', async (req, res) => {
    try {
        const { category } = req.query;
        const filter = {};
        if (category && category !== 'all') filter.category = category;

        const services = await Service.find(filter).sort({ createdAt: 1 });
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /api/services (admin)
router.post('/', auth, adminOnly, async (req, res) => {
    try {
        const service = await Service.create(req.body);
        res.status(201).json(service);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT /api/services/:id (admin)
router.put('/:id', auth, adminOnly, async (req, res) => {
    try {
        const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!service) return res.status(404).json({ message: 'Service not found' });
        res.json(service);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE /api/services/:id (admin)
router.delete('/:id', auth, adminOnly, async (req, res) => {
    try {
        const service = await Service.findByIdAndDelete(req.params.id);
        if (!service) return res.status(404).json({ message: 'Service not found' });
        res.json({ message: 'Service deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
