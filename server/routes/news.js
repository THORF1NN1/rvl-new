const express = require('express');
const News = require('../models/News');
const { auth, adminOnly } = require('../middleware/auth');
const router = express.Router();

// GET /api/news — public, list all news
router.get('/', async (req, res) => {
    try {
        const { featured, limit } = req.query;
        const filter = {};
        if (featured === 'true') filter.featured = true;

        const news = await News.find(filter)
            .sort({ date: -1 })
            .limit(limit ? parseInt(limit) : 50);

        res.json(news);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /api/news/:id
router.get('/:id', async (req, res) => {
    try {
        const item = await News.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'News not found' });
        res.json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /api/news (admin)
router.post('/', auth, adminOnly, async (req, res) => {
    try {
        const item = await News.create(req.body);
        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT /api/news/:id (admin)
router.put('/:id', auth, adminOnly, async (req, res) => {
    try {
        const item = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!item) return res.status(404).json({ message: 'News not found' });
        res.json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE /api/news/:id (admin)
router.delete('/:id', auth, adminOnly, async (req, res) => {
    try {
        const item = await News.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).json({ message: 'News not found' });
        res.json({ message: 'News deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
