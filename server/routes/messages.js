const express = require('express');
const Message = require('../models/Message');
const { auth, adminOnly } = require('../middleware/auth');
const router = express.Router();

// GET /api/messages — list all (admin only)
router.get('/', auth, adminOnly, async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /api/messages — public (anyone can send a message)
router.post('/', async (req, res) => {
    try {
        const message = await Message.create(req.body);
        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT /api/messages/:id (admin only, mark as read)
router.put('/:id', auth, adminOnly, async (req, res) => {
    try {
        const message = await Message.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(message);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
