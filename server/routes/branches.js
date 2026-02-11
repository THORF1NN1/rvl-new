const express = require('express');
const Branch = require('../models/Branch');
const { auth, adminOnly } = require('../middleware/auth');
const router = express.Router();

// GET /api/branches — public
router.get('/', async (req, res) => {
    try {
        const branches = await Branch.find().sort({ isMain: -1, createdAt: 1 });
        res.json(branches);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /api/branches (admin)
router.post('/', auth, adminOnly, async (req, res) => {
    try {
        const branch = await Branch.create(req.body);
        res.status(201).json(branch);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT /api/branches/:id (admin)
router.put('/:id', auth, adminOnly, async (req, res) => {
    try {
        const branch = await Branch.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!branch) return res.status(404).json({ message: 'Branch not found' });
        res.json(branch);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE /api/branches/:id (admin)
router.delete('/:id', auth, adminOnly, async (req, res) => {
    try {
        const branch = await Branch.findByIdAndDelete(req.params.id);
        if (!branch) return res.status(404).json({ message: 'Branch not found' });
        res.json({ message: 'Branch deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
