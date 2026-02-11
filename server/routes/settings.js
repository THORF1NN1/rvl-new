const express = require('express');
const Settings = require('../models/Settings');
const { auth, adminOnly } = require('../middleware/auth');
const router = express.Router();

// GET /api/settings
router.get('/', auth, adminOnly, async (req, res) => {
    try {
        let settings = await Settings.findOne();
        if (!settings) {
            settings = await Settings.create({});
        }
        res.json(settings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT /api/settings
router.put('/', auth, adminOnly, async (req, res) => {
    try {
        let settings = await Settings.findOne();
        if (!settings) {
            settings = await Settings.create(req.body);
        } else {
            Object.assign(settings, req.body);
            await settings.save();
        }
        res.json(settings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
