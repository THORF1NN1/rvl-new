const express = require('express');
const Application = require('../models/Application');
const { auth, adminOnly } = require('../middleware/auth');
const router = express.Router();

// GET /api/applications — list all (admin) or with filters
router.get('/', auth, async (req, res) => {
    try {
        const { status, search, limit } = req.query;
        const filter = {};

        if (status && status !== 'all') filter.status = status;
        if (search) {
            filter.$or = [
                { client: { $regex: search, $options: 'i' } },
                { service: { $regex: search, $options: 'i' } },
            ];
        }

        // If not admin/editor, only show current user's apps
        if (req.user.role !== 'admin' && req.user.role !== 'editor') {
            filter.userId = req.user.id;
        }

        const apps = await Application.find(filter)
            .sort({ createdAt: -1 })
            .limit(limit ? parseInt(limit) : 100);

        res.json(apps);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /api/applications/stats — dashboard stats
router.get('/stats', auth, async (req, res) => {
    try {
        const filter = {};
        if (req.user.role !== 'admin' && req.user.role !== 'editor') {
            filter.userId = req.user.id;
        }

        const total = await Application.countDocuments(filter);
        const pending = await Application.countDocuments({ ...filter, status: 'pending' });
        const approved = await Application.countDocuments({ ...filter, status: 'approved' });
        const rejected = await Application.countDocuments({ ...filter, status: 'rejected' });

        res.json({ total, pending, approved, rejected });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /api/applications
router.post('/', auth, async (req, res) => {
    try {
        const data = { ...req.body, userId: req.user.id };
        const app = await Application.create(data);
        res.status(201).json(app);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT /api/applications/:id
router.put('/:id', auth, adminOnly, async (req, res) => {
    try {
        const app = await Application.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!app) return res.status(404).json({ message: 'Application not found' });
        res.json(app);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE /api/applications/:id
router.delete('/:id', auth, adminOnly, async (req, res) => {
    try {
        const app = await Application.findByIdAndDelete(req.params.id);
        if (!app) return res.status(404).json({ message: 'Application not found' });
        res.json({ message: 'Application deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
