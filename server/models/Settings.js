const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
    siteName: { type: String, default: 'RVL Kazakhstan' },
    adminEmail: { type: String, default: 'admin@rvl.kz' },
    maintenanceMode: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
